const InsightsCard = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-2xl shadow text-white ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default InsightsCard;
