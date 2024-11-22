const ThingsToKnow = () => {
  return (
    <div className="mx-4 box-border mt-8 flex flex-col gap-6 md:mx-10 xl:mx-32 pb-5 ">
      <h1 className="text-2xl font-medium">Things To Know</h1>
      <div className="flex flex-col w-full md:flex-row ">
        <div className=" w-full md:w-1/3 flex flex-col gap-3">
          <h1 className="font-medium text-lg">House rules</h1>
          <div>Check-in:2:00PM - 5:00PM</div>
          <div>Checkout before 10:00AM</div>
          <div>10 guest maximum</div>
          <button className="underline font-medium self-start hover:font-semibold">
            Show more
          </button>
        </div>
        <div className=" w-full md:w-1/3 flex flex-col gap-3">
          <h1 className="font-medium text-lg">Safety & Property</h1>
          <div>Carbon monoxide alarm</div>
          <div>Smoke alarm</div>
          <button className="underline font-medium self-start hover:font-semibold">
            Show more
          </button>
        </div>
        <div className=" w-full md:w-1/3 flex flex-col gap-3">
          <h1 className="font-medium text-lg">Cancellation policy</h1>
          <div>
            Free cancellation before Dec 9. Cancel before Jan 1 for a partial
            refund.
          </div>
          <div>Review this Host's full policy for details.</div>
          <button className="underline font-medium self-start hover:font-semibold">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThingsToKnow;
