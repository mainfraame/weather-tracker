Feature: Get measurement statistics
  In order to understand trends of measurements
  I want to be able to get statistics over specified periods of time

  Background:
    Given I have submitted new measurements as follows:
      | timestamp                  | temperature | dewPoint |
      | "2015-09-01T16:00:00.000Z" | 27.1        | 16.9     |
      | "2015-09-01T16:10:00.000Z" | 27.3        |          |
      | "2015-09-01T16:20:00.000Z" | 27.5        | 17.1     |
      | "2015-09-01T16:30:00.000Z" | 27.4        | 17.3     |
      | "2015-09-01T16:40:00.000Z" | 27.2        |          |
      | "2015-09-01T17:00:00.000Z" | 28.1        | 18.3     |

  Scenario: Get stats for a well-reported metric
    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | stat         | max                      |
      | stat         | average                  |
      | metric       | temperature              |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 200
    And the response body is an array of:
      | metric        | stat      | value |
      | "temperature" | "min"     | 27.1  |
      | "temperature" | "max"     | 27.5  |
      | "temperature" | "average" | 27.3  |

  Scenario: Get stats for a sparsely reported metric
     # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | stat         | max                      |
      | stat         | average                  |
      | metric       | dewPoint                 |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 200
    And the response body is an array of:
      | metric     | stat      | value |
      | "dewPoint" | "min"     | 16.9  |
      | "dewPoint" | "max"     | 17.3  |
      | "dewPoint" | "average" | 17.1  |

  Scenario: Get stats for a metric that has never been reported
     # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | stat         | max                      |
      | stat         | average                  |
      | metric       | precipitation            |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 200
    And the response body is an empty array

  Scenario: Get stats for more than one metric
    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | stat         | max                      |
      | stat         | average                  |
      | metric       | temperature              |
      | metric       | dewPoint                 |
      | metric       | precipitation            |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 200
    And the response body is an array of:
      | metric        | stat      | value |
      | "temperature" | "min"     | 27.1  |
      | "temperature" | "max"     | 27.5  |
      | "temperature" | "average" | 27.3  |
      | "dewPoint"    | "min"     | 16.9  |
      | "dewPoint"    | "max"     | 17.3  |
      | "dewPoint"    | "average" | 17.1  |

  @new
  Scenario: Get stats for reported metrics not within requested date range
     # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | stat         | max                      |
      | stat         | average                  |
      | metric       | dewPoint                 |
      | metric       | temperature              |
      | fromDateTime | 2017-09-01T16:00:00.000Z |
      | toDateTime   | 2017-09-01T17:00:00.000Z |
    Then the response has a status code of 200
    And the response body is an empty array

  @new
  Scenario: Cannot get stats for an invalid stat
    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | foo                      |
      | stat         | bar                      |
      | metric       | temperature              |
      | metric       | dewPoint                 |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 400

  @new
  Scenario: Cannot get stats for without providing at least one metric
    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | max                      |
      | stat         | min                      |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 400

  @new
  Scenario: Cannot get stats for without providing at least one stat
    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | metric       | temperature              |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 400

  @new
  Scenario: Cannot get stats for without providing fromDateTime
    # GET /stats?<params...>
    When I get stats with parameters:
      | param      | value                    |
      | stat       | min                      |
      | metric     | temperature              |
      | toDateTime | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 400

  @new
  Scenario: Cannot get stats for without providing toDateTime
    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | metric       | temperature              |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
    Then the response has a status code of 400