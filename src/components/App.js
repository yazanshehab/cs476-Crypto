import React, { Component } from 'react';
import logo from '../TL.png';
import './App.css';
import Web3 from 'web3';
import TLToken from "../contracts/TLToken.sol"


class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBloackchainData()
  }
  async loadWeb3(){
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('non-ethereum browser detected. you should consider using Metamask')
    }
  }
  async loadBloackchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    const TLTokenAddress = "" // replace with contract address
    const balance = await TLToken.methods.balanceof(this.state.account).call()
    this.setState({balance: web3.utils.fromWei(balance.toString(),'Ether')})
    const transactions = await TLToken.getPastEvents('Transfer', {fromBlock: 0, toBlock: 'latest' }, {from: this.state.account})

  }
  transaction(recipient, amount){
    this.state.TLToken.methods.transfer(recipient, amount).send({from: this.state.account})
  }

  constructor(props) {
    super(props)
      this.state = {
        account: '',
        TLToken: null,
        balance: 0,
        transactions: []
      }
     // this.transfer = this.transfer.bind(this)
    }
  
  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content">
               
                  <img src={logo} className="App-logo" alt="logo" />
               
                <h1>{this.state.balance} TL</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const recipient = this.recipient.value
                  const amount = this.amount.value
                  console.log(recipient, amount)
                  this.transfer(recipient, amount)
                }}>

                  <div className="forms">
                    <input
                    id="recipient"
                    type="text"
                    ref={(input) => {this.recipient = input}}
                    className="form-control"
                    placeholder="recipient Address"
                    required />
                  </div>
                  <div className = "forms">
                    <input 
                    id="amount"
                    type="text"
                    ref={(input) => {this.amount = input}}
                    className="form-control"
                    placeholder="Amount"
                    required />
                  </div>

                  <button type="submit" className="Button">send</button>
                </form>  
             
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
