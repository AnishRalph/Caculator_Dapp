const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3
describe('mycalculatordapp', () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mycalculatordapp

  it('Creates a calculator', async() => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [calculator]
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to Solana")
  });
  
  //Addition
  it('Adds two numbers', async() => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)))
  });

  //Subtraction
  it('Subtracts two numbers', async() => {
    //BN(x) are just predefined numbers to execute the function
    await program.rpc.sub(new anchor.BN(32), new anchor.BN(33),{
      accounts: {
        calculator: calculator.publicKey
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(-1)))
  });
   
  //Multiplication
  it('Multiplies two numbers', async() => {
    await program.rpc.mul(new anchor.BN(2), new anchor.BN(33),{
      accounts: {
        calculator: calculator.publicKey
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(66)))
  });
 
  //Division
  it('Divide two numbers', async() => {
    await program.rpc.div(new anchor.BN(30), new anchor.BN(4),{
      accounts: {
        calculator: calculator.publicKey
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.quotient.eq(new anchor.BN(7)))
    assert.ok(account.remainder.eq(new anchor.BN(2)))
  });
});

/*
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";

describe("mycalculatordapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvi.env());

  const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
*/