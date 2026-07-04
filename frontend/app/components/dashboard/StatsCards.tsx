type Props = {
    bitcoinPrice: string;
    marketHealth: number;
    fearGreed: number;
};

export default function StatsCards({
    bitcoinPrice,
    marketHealth,
    fearGreed,
}: Props) {

    return (

        <div className="grid grid-cols-4 gap-6">

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">
                    Bitcoin
                </p>

                <h2 className="text-3xl font-bold mt-2">
                    ${bitcoinPrice}
                </h2>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">
                    Market Health
                </p>

                <h2 className="text-3xl font-bold text-green-400 mt-2">
                    {marketHealth}
                </h2>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">
                    Fear & Greed
                </p>

                <h2 className="text-3xl font-bold text-yellow-400 mt-2">
                    {fearGreed}
                </h2>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">
                    Status
                </p>

                <h2 className="text-3xl font-bold text-blue-400 mt-2">
                    Live
                </h2>
            </div>

        </div>

    );

}