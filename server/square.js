var SquareConnect = require("square-connect");

var apiInstance = new SquareConnect.OAuthApi();

module.exports = code => {
  var body = {
    client_id: process.env.SQUARE_UK_CLIENT_ID,
    client_secret: process.env.SQUARE_UK_CLIENT_SECRET,
    grant_type: "authorization_code",
    code
  };

  apiInstance.obtainToken(body).then(
    function(data) {
      console.log("API called successfully. Returned data: ");
      console.log(data);
      console.log(body);

      var defaultClient = SquareConnect.ApiClient.instance;
      var oauth2 = defaultClient.authentications["oauth2"];
      oauth2.accessToken = data.access_token;

      var api = new SquareConnect.LocationsApi();

      api.listLocations().then(
        function(locations) {
          console.log("locations");
          console.log(locations);
        },
        function(error) {
          console.error(error);
        }
      );

      // var transactionsApi = new SquareConnect.V1TransactionsApi();

      // var locationId = "locationId_example"; // String | The ID of the location to list online store orders for.

      // // var opts = {
      // //   order: "order_example", // String | TThe order in which payments are listed in the response.
      // //   limit: 56, // Number | The maximum number of payments to return in a single response. This value cannot exceed 200.
      // //   batchToken: "batchToken_example" // String | A pagination cursor to retrieve the next set of results for your original query to the endpoint.
      // // };
      // transactionsApi.listOrders(locationId).then(
      //   function(data) {
      //     console.log("API called successfully. Returned data: " + data);
      //   },
      //   function(error) {
      //     console.error(error);
      //   }
      // );
    },
    function(error) {
      console.error(error);
      console.log(body);
    }
  );
};
