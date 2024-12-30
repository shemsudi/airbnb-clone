import { useCallback, useEffect, useState } from "react";
import AccountHeader from "../components/accountSetting/accountHeadre";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import api from "../configs/api";
import { Link, useNavigate } from "react-router-dom";
import AccountCard from "../components/accountSetting/AccountCard";
import HomeIcon from "../components/icons/homeIcon";
import Footer from "../components/hosthomes/footer";
const houseIcon = <HomeIcon />;

interface SettingItemsProps {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}
const SettingsItems: SettingItemsProps[] = [
  {
    title: "Personal info",
    description: "Provide personal details and how we can reach you",
    icon: houseIcon,
    link: "/personal-info",
  },
  {
    title: "Login & security ",
    description: "Update your password and secure your account",
    icon: houseIcon,
    link: "/login-and-security",
  },
  {
    title: "Payments & payouts",
    description: "Review payments,payouts, coupons and gift cards",
    icon: houseIcon,
    link: "/payments/payment-methods",
  },
  {
    title: "Taxes",
    description: "Manage taxpayer information and tax documents",
    icon: houseIcon,
    link: "/taxes",
  },
  {
    title: "Notifications",
    description:
      "Choose notification preferences and how you want to be contacted",
    icon: houseIcon,
    link: "/notifications",
  },
  {
    title: "Privacy & sharing",
    description:
      "Manage your personal data, connected services, and data sharing settings",
    icon: houseIcon,
    link: "/privacy-and-sharing",
  },
  {
    title: "Global preferences",
    description: "Set your default langauge, currency and timezone",
    icon: houseIcon,
    link: "/preferences",
  },
  {
    title: "Travel for work",
    description: "Add a work email for business trip benefits",
    icon: houseIcon,
    link: "/airbnb-for-work",
  },
  {
    title: "Professional hosting tools",
    description:
      "Get professional tools if you manage several properties on Airbnb",
    icon: houseIcon,
    link: "/professional-hosting",
  },
  {
    title: "Referral credit & coupon ",
    description: "You have $0 referral credits and coupon. Learn more",
    icon: houseIcon,
    link: "../invite",
  },
];

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
const AccountSetting = () => {
  const navigte = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [user, setUser] = useState<User | null>(null);
  const HandleClick = useCallback(
    (link: string) => {
      if (link) navigte(link);
    },
    [navigte]
  );
  console.log(userId);

  useEffect(() => {
    if (!userId) return;
    const getUserById = async () => {
      const response = await api.get(`/user`);
      setUser(response.data);
    };
    getUserById();
  }, [userId]);
  if (user === null) return <div>Loading...</div>;
  const { firstName, lastName, email } = user;
  const fullName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName;
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 right-0 left-0 z-20 bg-white">
        <AccountHeader />
      </div>

      <div className="mx-6 md:mx-10 lg:mx-32  xl:mx-44  my-20 gap-4 flex flex-col  justify-center  ">
        <h1 className="text-4xl font-bold">Account</h1>
        <p className="flex gap-2 flex-wrap">
          <span className="font-medium text-xl">{fullName},</span>
          <span className="text-xl font-normal"> {email}</span>
          <Link
            className="underline opacity-95 text-xl hover:opacity-100 font-semibold"
            to={`/users/show/${userId}`}
          >
            Go to profile
          </Link>
        </p>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-3">
          {SettingsItems.map((card, index) => (
            <AccountCard
              onClick={() => HandleClick(card.link)}
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <div className="flex  flex-col mt-5 items-center justify-center">
          <p className="font-medium">Need to deactivate your account?</p>
          <div className="underline font-roboto">Take care or that now</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSetting;
