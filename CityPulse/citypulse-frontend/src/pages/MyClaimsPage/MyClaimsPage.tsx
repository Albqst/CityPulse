import statusNew from "../../assets/status-new.jpeg";
import statusInProgress from "../../assets/status-in-progress.jpeg";
import statusDone from "../../assets/status-done.jpeg";
import "./MyClaimsPage.css";

const MyClaimsPage = () => {
  const claims = [
    { id: 1, title: "Яма на дороге", status: "new" },
    { id: 2, title: "Сломанный фонарь", status: "in-progress" },
    { id: 3, title: "Не работает светофор", status: "done" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return statusNew;
      case "in-progress":
        return statusInProgress;
      case "done":
        return statusDone;
      default:
        return statusNew;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Новая";
      case "in-progress":
        return "В работе";
      case "done":
        return "Решена";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className="claims-page">
      <h2>Мои заявки</h2>

      <div className="claims-list">
        {claims.map((claim) => (
          <div key={claim.id} className="claim-card">
            <div className="claim-header">
              <img
                src={getStatusIcon(claim.status)}
                alt={claim.status}
                className="claim-status-icon"
              />
              <span className="claim-status-text">
                {getStatusText(claim.status)}
              </span>
            </div>

            <div className="claim-title">{claim.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClaimsPage;
