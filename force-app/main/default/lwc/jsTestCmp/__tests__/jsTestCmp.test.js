import { createElement } from "lwc";
import JsTestCmp from "c/jsTestCmp";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";
import getAllOpps from "@salesforce/apex/OpportunityController.getAllOpps";
import { CurrentPageReference } from "lightning/navigation";

// Realistic data with a list of contacts
const mockGetAccountList = require("./data/getAccountList.json");
const mockGetOppsList = require("./data/getOppsList.json");

// An empty list of records to verify the component does something reasonable
// when there is no data to display
const mockGetAccountListNoRecords = require("./data/getAccountListNoRecords.json");
const mockCurrentPageReference = require("./data/CurrentPageReference.json");

// Mock getAccountList Apex wire adapter
jest.mock(
  "@salesforce/apex/AccountController.getAccountList",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

jest.mock(
  "@salesforce/apex/OpportunityController.getAllOpps",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

describe("c-js-test-cmp", () => {
  beforeEach(() => {
    getAllOpps.mockResolvedValue(mockGetOppsList);
  });
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("Test dom element-Helloworld message", () => {
    // Arrange
    const element = createElement("c-js-test-cmp", {
      is: JsTestCmp
    });
    // Act
    document.body.appendChild(element);

    // Assert
    const p = element.shadowRoot.querySelector("p[data-id=helloWorld]");
    expect(p.textContent).toBe("Hello World!");
    expect(p.textContent).to;
  });

  it("onChange of inputText should change greeting", () => {
    // Arrange
    const element = createElement("c-js-test-cmp", {
      is: JsTestCmp
    });
    // Act
    document.body.appendChild(element);

    const inputElement = element.shadowRoot.querySelector("lightning-input");
    inputElement.value = "James";
    inputElement.dispatchEvent(new CustomEvent("change"));
    const p = element.shadowRoot.querySelector("p[data-id=helloWorld]");

    //Assert
    return Promise.resolve().then(() => {
      expect(p.textContent).toBe("Hello James!");
    });
  });

  it("Apex Wire Adapter->list all accts", () => {
    const element = createElement("c-js-test-cmp", {
      is: JsTestCmp
    });
    document.body.appendChild(element);

    // Emit data from @wire
    getAccountList.emit(mockGetAccountList);

    return Promise.resolve().then(() => {
      // Select elements for validation
      const accountElements = element.shadowRoot.querySelectorAll("span");
      expect(accountElements.length).toBe(mockGetAccountList.length);
      expect(accountElements[0].textContent).toBe(mockGetAccountList[0].Name);
    });
  });

  it("Apex Wire Adapter-> error- when server returns no data", () => {
    const element = createElement("c-js-test-cmp", {
      is: JsTestCmp
    });
    document.body.appendChild(element);

    // Emit error from @wire
    getAccountList.error();

    return Promise.resolve().then(() => {
      const errorElement = element.shadowRoot.querySelector("span");
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent).toBe("No accounts found.");
    });
  });

  it("Generic wire adapter->current page reference in <pre> tag", () => {
    const element = createElement("c-js-test-cmp", {
      is: JsTestCmp
    });
    document.body.appendChild(element);

    // Select element for validation
    const preElement = element.shadowRoot.querySelector("pre");
    expect(preElement).not.toBeNull();

    // Emit data from @wire
    CurrentPageReference.emit(mockCurrentPageReference);

    return Promise.resolve().then(() => {
      expect(preElement.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });
  });

  it("Imperative Server Call", () => {
    getAllOpps.mockResolvedValue(mockGetOppsList);
    const element = createElement("c-js-test-cmp", {
      is: JsTestCmp
    });
    document.body.appendChild(element);

    // Emit error from @wire
    getAccountList.error();

    return Promise.resolve().then(() => {
      // Select elements for validation
      const oppElements = element.shadowRoot.querySelectorAll("h2");
      expect(oppElements.length).toBe(mockGetOppsList.length);
      expect(oppElements[0].textContent).toBe(mockGetOppsList[0].Name);
    });
  });
});
