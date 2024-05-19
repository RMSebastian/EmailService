import { CallbackFunction, PromiseFunction, myThrowFunction, sum } from "./sum";

/** Unit Test
 *  
 * Verificamos unitaria mente funciones o clases para buscar errores
 * 
 * Cuando tiene spec o test enfrente de .ts, el programa sabe que es para test
 */
/**Matchers
 * Son la manera en las que se compara los resultados
 */


test("ToBe",()=>{//ToBe indica que deberia ser lo esperado
    expect(sum(1,2)).toBe(3);
    expect(2+2).toBe(4);
});
test("NotToBe",()=>{//NotToBe indica que deberia ser lo esperado
    expect(sum(1,2)).not.toBe(2);
})
test("ToEqual", ()=>{//ToEqual verifica que los valores de un objeto sean iguales
    const data = {one: 1};
    expect(data).toEqual({one: 1});
})
test("ToBeFalsy",()=>{//ToBeFalsy verifica si es false una variable (en contexto boleano)
    const n = null;
    expect(n).toBeFalsy();
})
test("Throw",()=>{//Throw verifica que un error sea tirado porque fue esperado
    expect(() =>{myThrowFunction();}).toThrow();
});

/**Callback and Promises Functions
 * 
 * En esto casos ahi que tener otras cosas en cuenta
 */
test("Callback Functions", (done) => {//Se pasa el la funcion como callback y se verifica si su contenido fue correcto
    function callback(data: string) {
        try {
            expect(data).toBe("Gay");
            done();
        } catch (error) {
            done(error);
        }
    }

    CallbackFunction(callback);
});
test("Resolves Promise Functions", ()=>{//Return sirve en caso de que resolves ocura
    return expect(PromiseFunction()).resolves.toBe("Gays");
})
/*
test("Rejects Promise Functions", ()=>{//Return en caso de error
    return expect(PromiseFunction()).rejects.toThrow("error");
})
*/
test("", async ()=>{//Diferente modo pero para usarlo en metodos asyncronicos
    const data = await PromiseFunction();
    expect(data).toBe("Gays");
})

/**Mock Functions
 * Nos permite fingir functiones con el fin de testear su logica y tratar de simularla
 */

const moskCallback = jest.fn(x => 42 + x);

test("Mock Functions Implementation", ()=>{
    const mock = jest.fn(x => 42 + x);

    expect(mock(42)).toBe(84);
    expect(mock).toHaveBeenCalledWith(42);
})

test("Spying Functions of an Object", ()=>{
    const video ={
        play(){
            return true;
        },
    };

    const spy = jest.spyOn(video, "play");

    video.play();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
})