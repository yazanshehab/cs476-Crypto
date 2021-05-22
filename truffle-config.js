require("@babel/register");
require("@babel/polyfill");

module.export ={
  contracts_directory : './contracts/',
  contracts_build_directory : './build/contracts/',
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

