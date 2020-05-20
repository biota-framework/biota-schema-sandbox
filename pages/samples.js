export const samples = {
  string: {
    input: "That's a cool text right there!",
    schema: {
      type: "string",
      contains: "cool",
      min: 10,
      max: 23
    }
  },
  number: {
    input: 32,
    schema: {
      type: "number",
      min: 10,
      max: 24
    }
  },
  object: {
    input: {
      firstName: "Joe",
      lastName: "Dalton",
      age: 28,
      address: {
        street: "Main street avenue",
        city: "Nowhere"
      }
    },
    schema: {
      type: "object",
      properties: {
        firstName: "string",
        lastName: "string",
        age: "number|integer",
        address: {
          type: "object",
          properties: {
            street: "string",
            city: "string|uppercase"
          }
        }
      }
    }
  }
};
