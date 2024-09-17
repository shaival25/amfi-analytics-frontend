export const getYAxisConfig = (colors) => ({
  labels: getLabel(colors),
});

export const getXAxisConfig = (colors, labels) => ({
  categories: labels,
  labels: getLabel(colors),
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  },
});

export const getLabel = (colors) => ({
  style: {
    colors: colors,
    fontFamily: "Inter",
  },
});

export const getGridConfig = (colors) => ({
  show: true,
  borderColor: colors,
  strokeDashArray: 10,
  position: "back",
});
