import uvicorn
from fastapi import FastAPI, File, UploadFile
import easyocr as ocr  #OCR
from PIL import Image #Image Processing
import numpy as np #Image Processing
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
import regex as re


from flask import Flask, render_template, request, jsonify,redirect

import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import model_from_json
from tensorflow.keras.preprocessing.image import img_to_array

import pickle
from health import health
from heart import heart

app = FastAPI()


pickle_in = open("Models/classifier.pkl", "rb")
classifier = pickle.load(pickle_in)


pickle_heart = open("Models/heart_rate.pkl", "rb")
heart_classifier = pickle.load(pickle_heart)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_model():
    #open file with model architecture
    json_file = open('Models/Pneumonia/model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    global model
    model = model_from_json(loaded_model_json)

    #load weights into new model
    model.load_weights("Models/Pneumonia/model.h5")
    print(model.summary())


def process_image(image):
    #read image
    #image = Image.open(BytesIO(image))
    if image.mode != "RGB":
        image = image.convert("RGB")

    # resize and convert to tensor
    image = image.resize((96, 96))
    image = img_to_array(image)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image


@app.get('/')
def index():
    return {'message': 'Hello, This is an API for OCR'}


def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    image = read_imagefile(await file.read())
    image = np.asarray(image)
    PAN = 'NAN'
    Name = 'NAN'
    FatherName = 'NAN'
    DOB = 'NAN'
    reader = ocr.Reader(['en'], model_storage_directory='.')
    OCR_text = reader.readtext(image, detail=0, width_ths=0.9)
    # print(OCR_text)
    datepatn = r'\d+[-/]\d+[-/]\d+'
    panpatn = r'([A-Z]){5}([O0-9]){4}([A-Z]){1}'
    namepatn = r'([A-Z]+)\s([A-Z]+)\s([A-Z]+)'
    fnamepatn = r'([A-Z]+)\s+?'
    godpatn = r'([A-Z]+)\s([A-Z]+)\s([A-Z]+)$|([A-Z]+)\s([A-Z]+)$'

    gov = [i for i, txt in enumerate(OCR_text) if 'GOVT' in txt][0]
    OCR_text = OCR_text[gov + 1:]
    temp = []
    for text in OCR_text:
        name = re.search(godpatn, text)
        # print(name.group())
        if name:
            temp.append(name.group())

    # Handle 'O's in Digits
    temp = ''
    for i, char in enumerate(PAN):
        if i > 4 and i < 9:
            if char == 'O':
                char = '0'
        temp = temp + char
    PAN = temp


    if Name == 'NAN':
        Name = temp[0]
    if FatherName == 'NAN':
        FatherName = temp[1]

    for text in OCR_text:
        if PAN == 'NAN' and re.search(panpatn, text):
            PAN = re.search(panpatn, text).group()
            break

    for text in OCR_text:
        if DOB == 'NAN' and re.search(datepatn, text):
            DOB = re.search(datepatn, text).group()
            break

    extracted = {
        'Pan_number': PAN,
        'Name': Name,
        'Father_Name': FatherName,
        'DOB': DOB
    }

    return PAN



@app.post("/pneumonia")
async def pneumonia(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"

    predictions = {}
    load_model()

    image = read_imagefile(await file.read())
    image = process_image(image)
    try:
        out = model.predict(image)
        # send the predictions to index page
        predictions = {"positive":str(np.round(out[0][1],2)),"negative":str(np.round(out[0][0],2))}
    except:
        predictions ={}

    return predictions


@app.post('/health')
async def health(data: health):

    data = data.dict()

    Status = data["Status"]
    Alcohol = data["Alcohol"]
    BMI = data["BMI"]

    prediction = classifier.predict([[Status, Alcohol, BMI]])

    return prediction[0]


@app.post('/heart')
async def heart(data: heart):

    data = data.dict()

    age = data["age"]
    totChol = data["totChol"]
    sysBP = data["sysBP"]
    diaBP = data["diaBP"]
    BMI = data["BMI"]
    heartRate = data["heartRate"]
    glucose = data["glucose"]

    #return([age, totChol, sysBP, diaBP, BMI, heartRate, glucose])


    prediction = heart_classifier.predict([[age, totChol, sysBP, diaBP, BMI, heartRate, glucose]])

    return prediction[0]



if __name__ == "__main__":
    uvicorn.run(app, debug=True)
