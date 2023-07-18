import { createElement } from "lwc";
import HelloWorld from "c/helloWorld";
import { CurrentPageReference } from "lightning/navigation";

// Mock realistic data
const mockCurrentPageReference = require("./data/CurrentPageReference.json");

describe("c-hello-world", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("To display message", () => {
    // Arrange
    const element = createElement("c-hello-world", {
      is: HelloWorld
    });

    // Act
    document.body.appendChild(element);
    const div = element.shadowRoot.querySelector("div");

    // Emit data from @wire
    const preElement = element.shadowRoot.querySelector("pre");
    expect(preElement).not.toBeNull();

    CurrentPageReference.emit(mockCurrentPageReference);
    // Assert
    expect(div.textContent).toBe("Hi, JEST Test!");

    return Promise.resolve().then(() => {
      expect(preElement.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });
  });

  it("onchange should change message", () => {
    // Arrange
    const element = createElement("c-hello-world", {
      is: HelloWorld
    });

    // Act
    document.body.appendChild(element);

    const inputElement = element.shadowRoot.querySelector("lightning-input");
    inputElement.value = "H1";
    inputElement.dispatchEvent(new CustomEvent("change"));
    const div = element.shadowRoot.querySelector("div");

    //Assert
    return Promise.resolve().then(() => {
      expect(div.textContent).toBe("Hi, H1");
    });
  });
});
