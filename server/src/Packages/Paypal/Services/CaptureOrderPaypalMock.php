<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

/**
 * Mocking equivalent of StripeService
 */
class CaptureOrderPaypalMock
{
    public static function captureOrder($orderId, $debug = false)
    {
        return json_decode('{
            "result":{
                "id":"81M70884VT025633W",
                "links":[
                   {
                      "rel":"self",
                      "href":"https://api.sandbox.paypal.com/v2/checkout/orders/18E660857J826615N",
                      "method":"GET"
                   }
                ],
                "payer":{
                   "name":{
                      "surname":"lastname",
                      "given_name":"TEst mae"
                   },
                   "address":{
                      "country_code":"US"
                   },
                   "payer_id":"P82T2D5PLGBHC",
                   "email_address":"a@m.com"
                },
                "status":"COMPLETED",
                "purchase_units":[
                   {
                      "payments":{
                         "captures":[
                            {
                               "id":"3LL44914BT722322F",
                               "links":[
                                  {
                                     "rel":"self",
                                     "href":"https://api.sandbox.paypal.com/v2/payments/captures/3LL44914BT722322F",
                                     "method":"GET"
                                  },
                                  {
                                     "rel":"refund",
                                     "href":"https://api.sandbox.paypal.com/v2/payments/captures/3LL44914BT722322F/refund",
                                     "method":"POST"
                                  },
                                  {
                                     "rel":"up",
                                     "href":"https://api.sandbox.paypal.com/v2/checkout/orders/18E660857J826615N",
                                     "method":"GET"
                                  }
                               ],
                               "amount":{
                                  "value":"298.46",
                                  "currency_code":"USD"
                               },
                               "status":"COMPLETED",
                               "create_time":"2020-11-10T13:25:39Z",
                               "update_time":"2020-11-10T13:25:39Z",
                               "final_capture":true,
                               "seller_protection":{
                                  "status":"NOT_ELIGIBLE"
                               },
                               "seller_receivable_breakdown":{
                                  "net_amount":{
                                     "value":"286.52",
                                     "currency_code":"USD"
                                  },
                                  "paypal_fee":{
                                     "value":"11.94",
                                     "currency_code":"USD"
                                  },
                                  "gross_amount":{
                                     "value":"298.46",
                                     "currency_code":"USD"
                                  }
                               }
                            }
                         ]
                      },
                      "shipping":{
                         "name":{
                            "full_name":"TEst mae lastname"
                         },
                         "address":{
                            "postal_code":"00000",
                            "admin_area_1":"IN",
                            "admin_area_2":"Durban",
                            "country_code":"US",
                            "address_line_1":"Some address"
                         }
                      },
                      "reference_id":"default"
                   }
                ]
             },
             "headers":{
                "":"",
                "Date":"Tue, 10 Nov 2020 13",
                "Content-Type":"application/json",
                "Cache-Control":"max-age=0, no-cache, no-store, must-revalidate",
                "Content-Length":"1346",
                "Paypal-Debug-Id":"b7341248b46cf"
             },
             "statusCode":201
        }');
    }
}
