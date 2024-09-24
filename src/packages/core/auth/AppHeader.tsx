import AppLogo from "./AppLogo";

type AppHeaderProps = {
  loginId?: string;
  signOut?: () => void;
};

const AppHeader = ({ loginId, signOut = () => {} }: AppHeaderProps) => {
  return (
    <div className="navbar bg-base-100 relative">
      <div className="flex-1">
        <AppLogo />
      </div>
      <div className="flex-none">
        <span>{loginId}</span>
        <div className="tooltip tooltip-bottom" data-tip="Sign Out">
          <button className="btn btn-link rotate-180" onClick={() => signOut()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
