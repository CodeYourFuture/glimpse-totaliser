var SquareConnect = require("square-connect");
const { getDateFromString } = require("./utils");

var defaultClient = SquareConnect.ApiClient.instance;
var oauth2 = defaultClient.authentications["oauth2"];
oauth2.accessToken = process.env.SQUARE_UK_ACCESS_TOKEN;

var locationsApi = new SquareConnect.LocationsApi();

// locationsApi.listLocations().then(console.log);

const london = "GD082R891TXHY";

var apiInstance = new SquareConnect.PaymentsApi();

// var opts = {
//   'beginTime': "beginTime_example", // String | Timestamp for the beginning of the reporting period, in RFC 3339 format. Inclusive. Default: The current time minus one year.
//   'endTime': "endTime_example", // String | Timestamp for the end of the requested reporting period, in RFC 3339 format.  Default: The current time.
//   'sortOrder': "sortOrder_example", // String | The order in which results are listed. - `ASC` - oldest to newest - `DESC` - newest to oldest (default).
//   'cursor': "cursor_example", // String | A pagination cursor returned by a previous call to this endpoint. Provide this to retrieve the next set of results for the original query.  See [Pagination](https://developer.squareup.com/docs/basics/api101/pagination) for more information.
//   'locationId': "locationId_example", // String | ID of ocation associated with payment
//   'total': 789, // Number | The exact amount in the total_money for a `Payment`.
//   'last4': "last4_example", // String | The last 4 digits of `Payment` card.
//   'cardBrand': "cardBrand_example" // String | The brand of `Payment` card. For example, `VISA`
// };

const paginate = async (params, request, transform) => {
  let responses = [];
  let nextCursor = undefined;
  do {
    console.log("paginating");
    const response = await request({ ...params, cursor: nextCursor });
    responses = [...responses, ...transform(response)];
    nextCursor = response.cursor;
  } while (nextCursor);
  return responses;
};

paginate(
  {
    locationId: london,
    beginTime: getDateFromString("today")
  },
  params => apiInstance.listPayments(params),
  res => res.payments
)
  //   .then(res => res.payments)
  .then(payments => payments.map(payment => payment.created_at))
  .then(console.log);
