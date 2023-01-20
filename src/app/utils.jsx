const convertBarData = (data) => {
  return data.map((item) => {
    return {
      name: item.name,
      value: item.value,
    };
  });
};

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const fieldToLabel = (field = "") => {
  return field
    .split("_")
    .map((i) => i.toUpperCase())
    .join(" ");
};

const formatTableData = (data) => {
  return data.map((item) => {
    return {
      ...item,
      url: item.url ? <a href={item.url}>Click Here</a> : "No URL",
    };
  });
};

export { plugin, formatTableData, fieldToLabel };
