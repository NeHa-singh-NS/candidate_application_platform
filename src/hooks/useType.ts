const UseTypeof = () => {
  return (value: number) => {
    return typeof value === "number" ? value : 0;
  };
};

export default UseTypeof;
