// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract HAT_TOKEN is ERC20 {
    
    
    
    struct User{
        string name;
        address user_crypto_id;
        string password;
    }
    
    
    struct Transaction{
        address sender;
        address reciver;
        uint256 amount;
        string transaction_type;
    }
    
    
    struct Contact{
        address owner;
        address contact_name;
        string name;
        string contact_type;
    }

    //event NewUser( string name, address user_crypto_id, string password);
    
    User[] public Users;
    Contact[] public Contacts;
    Transaction[] public Transactions;

    


    
    address public admin;
    address public employeeadmin;
    uint256 total_hat_burnt;
    
    constructor() ERC20('Hitaya Token', 'HAT'){
        _mint(msg.sender, 1000000000 * 10 ** 18);
    }
    
    
    function mint(address to, uint amount) external {
        require(msg.sender==admin, 'only admin');
        _mint(to, amount);
    }
    
    
    function burn(uint amount) external {
        total_hat_burnt+=amount;
        _burn(msg.sender, amount);
    }
    
    
    function change_admin(address _address) public{
        admin=_address;
    }
    
    
    function change_employeeadmin(address _address) public{
        employeeadmin=_address;
    }
    
    
    function login(string memory _password) public view returns (bool){
        for (uint i=0;i<Users.length;i++){
            if (Users[i].user_crypto_id==msg.sender && keccak256(abi.encodePacked(Users[i].password))==keccak256(abi.encodePacked(_password))){
                return true;
            }
        }
        return false;
    }
    
    
    function hat_burnt() public view returns(uint256){
        return (total_hat_burnt);
    }
    

    function _create_New_User(string memory _name, address _user_crypto_id, string memory _password) public {
        Users.push(User( _name, _user_crypto_id, _password));   
    }
    
    
    function _create_New_Contact(address _owner, address _contact_name, string memory _name, string memory _contact_type) public {
        Contacts.push(Contact( _owner, _contact_name, _name,_contact_type));
    }
    

    function transfer(address recipient, uint256 amount, string memory _trans_type) public virtual returns (bool) {
        _transfer(msg.sender, recipient, amount);
        Transactions.push(Transaction( msg.sender, recipient, amount, _trans_type));
        return true;
    }
    
    
    function airdrop(address recipient, uint256 amount) public virtual returns (bool) {
        _transfer(msg.sender, recipient, amount);
        Transactions.push(Transaction( msg.sender, recipient, amount, "AIR DROP"));
        return true;
    }
    
    
    function user_view(uint id) public view returns (string memory ,address , string memory)
    {
        User memory p = Users[id];
        return (p.name,p.user_crypto_id,p.password); 
    }

    
    
    function user_view() public view returns (User[] memory)
    {

        return (Users); 
    }
    
    
    function transaction_view() public view returns (Transaction[] memory)
    {

        return (Transactions); 
    }
    
    
    function contacts_view() public view returns (Contact[] memory)
    {

        return (Contacts);
    }
}
