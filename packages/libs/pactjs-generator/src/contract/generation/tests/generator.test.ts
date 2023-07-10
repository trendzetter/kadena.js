import { pactParser } from '../../parsing/pactParser';
import { generateDts } from '../generator';

describe('generateDts', () => {
  it('return type definition file for a module', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defcap test-cap (name:string) true)
        (defun test-func:boolean (parameter-one:string parameter-two:boolean )
          (with-capability (test-cap "name"))
        )
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });

  it('use any type if function parameters dont have a type', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defcap test-cap (name:string) true)
        (defun test-func:boolean (parameter-one parameter-two:boolean )
          (with-capability (test-cap "name"))
        )
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });

  it('use object type if function parameters is object{schema}', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defcap test-cap (name:string) true)
        (defun test-func:boolean (parameter-one:object{schema-one} parameter-two:boolean )
          (with-capability (test-cap "name"))
        )
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });

  it('does not generate capability interface if the function uses no capabilities', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defun test-func:boolean (parameter-one:number parameter-two:boolean )
        )
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });

  it('throws an exception if requested module is not in the parsed modules', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defun test-func:boolean (parameter-one:number parameter-two:boolean )
        )
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    expect(() => generateDts('user.test-module-2', modules)).toThrowError(
      `Module user.test-module-2 not found`,
    );
  });

  it('throws an exception if requested module does not have any functions', async () => {
    const module = `(namespace "user")
      (module test-module governance)
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    modules['user.test-module'].functions = undefined;

    expect(() => generateDts('user.test-module', modules)).toThrowError(
      `Module user.test-module has no functions`,
    );
  });

  it('uses the property type if there is no mapped value for that', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defun test (param:newType))
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });

  it('function parameter is empty if the defun has no param', async () => {
    const module = `(namespace "user")
      (module test-module governance
        (defun test ())
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });

  it('adds module, capability and function docs to the dts file', async () => {
    const module = `(namespace "user")
      (module test-module governance
        @doc "this is module doc"
        (defcap test-cap (name:string)
          @doc "this is defcap doc"
          true)
        (defun test-func:boolean (parameter-one:object{schema-one} parameter-two:boolean )
          @doc "this is defun doc"
          (with-capability (test-cap "name"))
        )
      )
    `;

    const modules = await pactParser({
      files: [module],
      getContract: () => Promise.resolve(''),
    });

    const dts = generateDts('user.test-module', modules);
    expect(dts).toMatchSnapshot();
  });
});
