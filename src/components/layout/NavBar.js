import Icon from "./Icon";
import SmallNav from "./SmallNav";
import ModeChangeBtn from "./ModeChangeBtn";
import { Link } from "react-router-dom";
import {useAppSelector } from "../../hook/useStore";

export default function NavBar() {
  const Authenticate = useAppSelector(
    (state) => state.user.auth
  );
  return (
    <>
      <nav className="hidden  w-full px-10 py-10 sm:grid grid-cols-5  items-center justify-center  capitalize font-serif ">
        <div className="flex items-center col-span-2  ">
          <Icon />
        </div>
        <div className="flex text-center  col-span-3  items-center justify-end gap-3">
          <span className="inline-block group px-5">
            <Link
              to="/"
              className="w-fit hover:border-b-current border-transparent border-b-2 py-1 inline-block"
            >
              Lookbook
            </Link>
          </span>
          <span className=" inline-block group px-5 ">
            <Link
              to="/Shop"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              shop
            </Link>
          </span>
          <span className=" inline-block group px-5">
            <Link
              to="/About"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              about
            </Link>
          </span>
          <span className=" inline-block group px-5">
            <Link
              to="/Contact"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              contact
            </Link>
          </span>
          {Authenticate ? (
            <span className=" inline-block group px-5">
              <Link
                to="/dashboard"
                className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
                >
                Dashboard
              </Link>
            </span>
          ) : (
            <span className=" inline-block group px-5">
              <Link
                to="/authentication"
                className="bg-orange-200 border border-orange-600 transition-all text-orange-600 hover:bg-inherit  py-2 px-6   flex items-center justify-center"
              >
                Login
              </Link>
            </span>
          )}
          <span className="mr-6 p-2 px-3 border rounded-full border-dark">
          <ModeChangeBtn />
          </span>
        </div>
      </nav>
      <SmallNav />
    </>
  );
}
