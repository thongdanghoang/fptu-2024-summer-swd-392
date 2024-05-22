import ApplicationService from "../shared/services/application.service.ts";

const TestLoginComponent = () => {
  const applicationService: ApplicationService = new ApplicationService();

  const fetchData = (): void => {
    applicationService.getApiClient().get("http://localhost:3000/")
      .then(response => console.log(response.data))
      .catch(error => console.error("Error:", error));
  };

  if (applicationService.isAuthenticated()) {
    return (
      <div>
        <strong>Logged in! 🎉</strong><br />
        <button type="button" className="btn btn-outline-success" onClick={() => applicationService.signOutRedirect()}>Log out!</button>
        <button type="button" className="btn btn-success" onClick={fetchData}>Fetch Data</button>
      </div>
    );
  }
  return <div>Not logged in! Try to refresh to be redirected to Google.</div>;
};

export default TestLoginComponent;
