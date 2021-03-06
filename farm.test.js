const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("calculate price for crop", () => {
    const corn = {
      name: "corn",
      price: 2,
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };

    expect(getCostsForCrop(input)).toBe(40);
  });

  test("calculate price for crop with price 0", () => {
    const corn = {
      name: "corn",
      price: 0,
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };

    expect(getCostsForCrop(input)).toBe(0);
  });

  test("calculate price for crop with no price", () => {
    const corn = {
      name: "corn",
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };

    expect(getCostsForCrop(input)).toBe(NaN);
  });
});

describe("getRevenueForCrop", () => {
  test("Calculate revenue for crop with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 5,
      salePrice: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getRevenueForCrop(input)).toBe(150);
  });

  test("Calculate revenue for crop with no environment factors and 0 sale price", () => {
    const corn = {
      name: "corn",
      yield: 5,
      salePrice: 0,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getRevenueForCrop(input)).toBe(0);
  });
});

describe("getProfitForCrop", () => {
  test("Calculate profit with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
    };

    const input = {
      crop: corn,
      numCrops: 5,
    };

    expect(getProfitForCrop(input)).toBe(35);
  });

  test("Calculate profit with no environment factors and sale price lower as cost price", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 10,
      salePrice: 2,
    };

    const input = {
      crop: corn,
      numCrops: 5,
    };

    expect(getProfitForCrop(input)).toBe(-20);
  });

  test("Calculate profit with no environment factors and 0 yield", () => {
    const corn = {
      name: "corn",
      yield: 0,
      price: 10,
      salePrice: 2,
    };

    const input = {
      crop: corn,
      numCrops: 5,
    };

    expect(getProfitForCrop(input)).toBe(-50);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with no environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      price: 3,
      salePrice: 5,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    expect(getTotalProfit({ crops })).toBe(69);
  });

  test("Calculate total profit with no environmental factors and 0 crops for one crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      price: 3,
      salePrice: 5,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 0 },
    ];

    expect(getTotalProfit({ crops })).toBe(35);
  });

  test("Calculate total profit with no environmental factors and 0 yield for one crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 0,
      price: 3,
      salePrice: 5,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    expect(getTotalProfit({ crops })).toBe(29);
  });
});

// Test with environment factors
describe("getYieldForPlant with environment factors", () => {
  test("Get yield for plant - sun: high", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
  });

  test("Get yield for plant - rain: medium", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        rain: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      rain: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(30);
  });

  test("Get yield for plant - wind: low", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        wind: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      wind: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant - sun: low rain: high wind: medium", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        rain: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "high",
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(22.5);
  });
});

describe("getYieldForCrop with environment factors", () => {
  test("Calculate yield for crop", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const input = {
      crop: corn,
      numCrops: 2,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBe(30);
  });
});

describe("getTotalYield with environment factors", () => {
  test("Calculate total yield with multiple crops and different values for environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 30,
          medium: 0,
          high: -15,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops }, environmentFactors)).toBe(13.75);
  });

  test("Calculate total yield with 0 amount and environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getRevenueForCrop with environment factors", () => {
  test("Calculate revenue for crop", () => {
    const corn = {
      name: "corn",
      yield: 5,
      salePrice: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getRevenueForCrop(input, environmentFactors)).toBe(75);
  });
});

describe("getProfitForCrop with environment factors", () => {
  test("Calculate profit", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const input = {
      crop: corn,
      numCrops: 5,
    };

    expect(getProfitForCrop(input, environmentFactors)).toBe(12.5);
  });

  test("Calculate profit with a lower sale price as cost price", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 1,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const input = {
      crop: corn,
      numCrops: 5,
    };

    expect(getProfitForCrop(input, environmentFactors)).toBe(-2.5);
  });
});

describe("getTotalProfit with environment factors", () => {
  test("Calculate total with one environment setting", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      price: 3,
      salePrice: 5,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    expect(getTotalProfit({ crops }, environmentFactors)).toBe(26.5);
  });

  test("Calculate total with multiple environment setting", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 30,
          medium: 0,
          high: -15,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      price: 3,
      salePrice: 5,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 30,
          medium: 0,
          high: -15,
        },
        rain: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    expect(getTotalProfit({ crops }, environmentFactors)).toBe(39.25);
  });
});
