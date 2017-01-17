
<?php

$name = $_GET['name'];
$dateDeparture = $_GET['dateDeparture'];
$dateArrival = $_GET['dateArrival'];
$addressDeparture = $_GET['addressDeparture'];
$addressArrival = $_GET['addressArrival'];
$service = $_GET['service'];
$numberPassengers = $_GET['numberPassengers'];
$type = $_GET['type'];

$json_data = '

                    <!--booking__message-->
            <div class="booking__message">

                <!--booking__message-wrap-->
                <div class="booking__message-wrap">

                    <!--booking__message-title-->
                    <h2 class="booking__message-title">Thank you, Mr. Crespinet !</h2>
                    <!--/booking__message-title-->

                    <!--booking__message-text-->
                    <p class="booking__message-text">
                        Your limousine has been booked. If you have any question regarding
                        your booking, just call us: <a href="tel:023181463">02 318 14 63</a>.
                    </p>
                    <!--/booking__message-text-->

                    <!--booking__message-card-->
                    <div class="booking__message-card">

                        <!--booking__message-print-->
                        <a href="#" class="booking__message-print">
                            <i class="fa fa-print" aria-hidden="true"></i>
                        </a>
                        <!--/booking__message-print-->

                        <!--booking__message-type-->
                        <div class="booking__message-type">
                            Airport transfer
                            <span>3 to 7 people, Business class car</span>
                        </div>
                        <!--/booking__message-type-->

                        <!--booking__message-card-wrap-->
                        <div class="booking__message-card-wrap">

                            <dl>
                                <dt>Departure</dt>
                                <dd>
                                    <time datetime="2016-12-12">The 12th december at 8 AM</time>
                                    <address>Leopoldlaan, 1930 Zaventem</address>
                                </dd>
                            </dl>

                            <dl>
                                <dt>Arrival</dt>
                                <dd>
                                    <time datetime="2016-12-12">The 12th december at 8.30 AM</time>
                                    <address>Rue de ransbeek 230,
                                        1120 Neder-Over-Heembeek/address</address>
                                </dd>
                            </dl>

                        </div>
                        <!--/booking__message-card-wrap-->

                    </div>
                    <!--/booking__message-card-->

                    <!--booking__message-return-->
                    <a class="booking__message-return" href="#">Return to our services
                        <i>
                            <svg x="0px" y="0px" viewBox="0 0 284.935 284.936" style="enable-background:new 0 0 284.935 284.936;"
                     xml:space="preserve">
                <g>
                    <path d="M222.701,135.9L89.652,2.857C87.748,0.955,85.557,0,83.084,0c-2.474,0-4.664,0.955-6.567,2.857L62.244,17.133
                        c-1.906,1.903-2.855,4.089-2.855,6.567c0,2.478,0.949,4.664,2.855,6.567l112.204,112.204L62.244,254.677
                        c-1.906,1.903-2.855,4.093-2.855,6.564c0,2.477,0.949,4.667,2.855,6.57l14.274,14.271c1.903,1.905,4.093,2.854,6.567,2.854
                        c2.473,0,4.663-0.951,6.567-2.854l133.042-133.044c1.902-1.902,2.854-4.093,2.854-6.567S224.603,137.807,222.701,135.9z"/>
                </g>

                </svg>
                        </i>
                    </a>
                    <!--/booking__message-return-->

                </div>
                <!--/booking__message-wrap-->

            </div>
            <!--/booking__message-->

';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

echo $json_data;
exit;
?>
