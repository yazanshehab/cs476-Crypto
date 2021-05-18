require("@babel/register");
require("@babel/polyfill");

module.export ={
  contracts_directory : './src/contracts/',
  contracts_build_directory : './src/contracts/output/',
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,   
      network_id: "*", // Match any network id
    },
      compilers: {
        solc: {
          optimizer: {
            enabled: true,
            runs: 200
        
      }
    }
   
    }
  },
};

