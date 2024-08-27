import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

function menu() {
  setTimeout(async() => {
    console.clear();

    console.log("1 - Create Wallet");
    console.log("2 - Recover Wallet");
    console.log("3 - Balance");
    console.log("4 - Send");
    console.log("5 - Search Tx");
    const answer = await rl.question("Choose your option:");

    switch (answer) {
      case "1":
        break;
      case "2":
        break;

      case "3":
        break;

      case "4":
        break;

      case "5":
        break;

      default: {
        console.log("This option is not available. Try again");
        menu();
      }
      
    }
  }, 1000);
}

menu();
