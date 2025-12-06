import { DNA, Oval } from "react-loader-spinner";

export function dnaLoader(visible = true) {
  return (
    <DNA
      visible={visible}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperClass="loader-center"
      colors={["#51e2f5", "#9df9ef", "#51e2f5"]}
    />
  );
}

export function ovalLoader(visible = true) {
  return (
    <Oval
      visible={visible}
      height="20"
      width="20"
      color="#51e2f5"
      secondaryColor="#9df9ef"
      ariaLabel="oval-loading"
      wrapperClass="loader-center"
    />
  );
}

export default function Loading({ type = "dna", visible = true }) {
  const loaderMap = {
    dna: dnaLoader,
    oval: ovalLoader,
  };

  const SelectedLoader = loaderMap[type] || dnaLoader;

  return (
    <div className="loading-wrapper">
      {SelectedLoader(visible)}
    </div>
  );
}
