import { createElement } from 'lwc';
import SharedJsFile from 'c/sharedJsFile';

describe('c-shared-js-file', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-shared-js-file', {
            is: SharedJsFile
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });

    it('fetchData1-return promise-then', () => {
        // Arrange
        const element = createElement('c-shared-js-file', {
            is: SharedJsFile
        });
        // Act
        document.body.appendChild(element);
        //Assert
        element.fetchData1().then(d=>{
            expect(d).toBe('Success!');
        });
    });

    it('fetchData2-return promise-await', async() => {
        // Arrange
        const element = createElement('c-shared-js-file', {
            is: SharedJsFile
        });

        // Act
        document.body.appendChild(element);
        //Assert
        const data = await element.fetchData2();
        expect(data).toBe('Success!');
    });

    test('the fetch fails with an error', async () => {
         // Arrange
         const element = createElement('c-shared-js-file', {
            is: SharedJsFile
        });

        // Act
        document.body.appendChild(element);
        //Assert        
        try {
          await element.fetchData3();
        } catch (e) {
          expect(e).toMatch('Failed!');
        }
      });

});