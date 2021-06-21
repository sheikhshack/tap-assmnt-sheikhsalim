const {listOfGoodUrls, listOfBadUrls} = require("./data");
const {checkValidURL} = require("../utils/helper");
const generator = require("../utils/helper").generator
const {Short} = require('../models/short')



const generateDummyURL = (path) => {
    return (`http://localhost:5000/${path}`)
}
jest.mock('../models/short')




describe('testing the generator validity', () => {
    beforeEach(() => {
        const mock = jest.spyOn(Short, "findByPk")
        mock.mockImplementation(() => Promise.resolve(null))
    })
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should generate correct output, with sufficient collision tolerance', async () => {

        const testMock = jest.spyOn(Short, "findByPk")
        testMock.mockImplementation(() => Promise.resolve(null))
        let arr = []
        for (let i = 0; i < 10000; i++){
            let response = await generator()
            arr = [...arr, response]
        }
        const isArrayUnique = (arr) => new Set(arr).size === arr.length

        expect(testMock).toBeCalledTimes(10000)
        expect(isArrayUnique(arr)).toBeTruthy()

    });
    test('should generate new on clash', async () => {

        const testMock = jest.spyOn(Short, "findByPk")
        testMock.mockImplementation(() => Promise.resolve(null))
        testMock.mockReturnValueOnce(Promise.resolve(1)) // first return is a clash



        let result = await generator()
        expect(testMock).toBeCalledTimes(2)

    });

    test('length of generator output is 8', async () => {

        const generated = await generator()
        expect(generated).toHaveLength(8)
    })
    test('generator output needs to be acceptable url', () => {
        jest.mock('../')
        expect(() => {
            const generatedURL = generateDummyURL(generator() + '`')
            const result = new URL(generatedURL).toString()
            return result
        }).not.toThrow()
    } )


})

describe('testing the url validation', () => {

    test.each(listOfBadUrls)('url (%j) should throw', (input) => {
        expect(() => checkValidURL(input)).toThrow('Malformed input')
    })

    test.each(listOfGoodUrls)('url (%j) should not throw', (input) => {
        expect(() => checkValidURL(input)).not.toThrow()
    })
})

