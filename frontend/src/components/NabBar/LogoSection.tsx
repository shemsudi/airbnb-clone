import Logo from "../../assets/logos";
import Search from "../root/search";

const LogoSection = ({ isAtTop }: { isAtTop: boolean }) => {
  return (
    <div className="flex">
      <Logo />
      <div className="hidden max-lg:block">{!isAtTop && <Search />}</div>
    </div>
  );
};

export default LogoSection;
