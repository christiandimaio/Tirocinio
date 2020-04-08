#               << RESP_VER	RESP.XX.T0089..MHZ.SMART24.4.40.5.5.LP	2011.256	NEW	 >>
#               << RESP_VER	RESP.XX.T0089..MHZ.SMART24.4.40.5.5.LP	2013.125	UPDATED	Corrected bad coefficient count (126->128) >>
#		<< IRIS SEED Reader, Release 4.8 >>
#
#
#		======== CHANNEL RESPONSE DATA ========
B050F03     Station:     T0089
B050F16     Network:     XX
B052F03     Location:    ??
B052F04     Channel:     MHZ
B052F22     Start date:  2006,001,00:00:00.0000
B052F23     End date:    No Ending Time
#		=======================================
#		+               +--------------------------------------------+                +
#		+               |   Response (Poles & Zeros), T0089 ch MHZ   |                +
#		+               +--------------------------------------------+                +
#
B053F03     Transfer function type:                A [Laplace Transform (Rad/sec)]
B053F04     Stage sequence number:                 1
B053F05     Response in units lookup:              M/S - Velocity in Meters Per Second
B053F06     Response out units lookup:             V - Volts
B053F07     A0 normalization factor:               1.000000E+00
B053F08     Normalization frequency:               5.000000E-02
B053F09     Number of zeroes:                      0
B053F14     Number of poles:                       0
#		Complex zeroes:
#		  i  real          imag          real_error    imag_error
#		Complex poles:
#		  i  real          imag          real_error    imag_error
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 1
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 2
B058F04     Gain:                                  4.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 3
B054F05     Response in units lookup:              V - Volts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  1
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  1.000000e+00  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 3
B057F04     Input sample rate:                     5.120000e+05
B057F05     Decimation factor:                     1
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             0.000000E+00
B057F08     Correction applied (seconds):          0.000000E+00
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 3
B058F04     Gain:                                  3.057080e+05
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 4
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  36
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  3.051760e-05  0.000000E+00
B054F08-09    1  1.525880e-04  0.000000E+00
B054F08-09    2  4.577640e-04  0.000000E+00
B054F08-09    3  1.068120e-03  0.000000E+00
B054F08-09    4  2.136230e-03  0.000000E+00
B054F08-09    5  3.845210e-03  0.000000E+00
B054F08-09    6  6.408690e-03  0.000000E+00
B054F08-09    7  1.007080e-02  0.000000E+00
B054F08-09    8  1.495360e-02  0.000000E+00
B054F08-09    9  2.105710e-02  0.000000E+00
B054F08-09   10  2.825930e-02  0.000000E+00
B054F08-09   11  3.631590e-02  0.000000E+00
B054F08-09   12  4.486080e-02  0.000000E+00
B054F08-09   13  5.340580e-02  0.000000E+00
B054F08-09   14  6.134030e-02  0.000000E+00
B054F08-09   15  6.793210e-02  0.000000E+00
B054F08-09   16  7.263180e-02  0.000000E+00
B054F08-09   17  7.507320e-02  0.000000E+00
B054F08-09   18  7.507320e-02  0.000000E+00
B054F08-09   19  7.263180e-02  0.000000E+00
B054F08-09   20  6.793210e-02  0.000000E+00
B054F08-09   21  6.134030e-02  0.000000E+00
B054F08-09   22  5.340580e-02  0.000000E+00
B054F08-09   23  4.486080e-02  0.000000E+00
B054F08-09   24  3.631590e-02  0.000000E+00
B054F08-09   25  2.825930e-02  0.000000E+00
B054F08-09   26  2.105710e-02  0.000000E+00
B054F08-09   27  1.495360e-02  0.000000E+00
B054F08-09   28  1.007080e-02  0.000000E+00
B054F08-09   29  6.408690e-03  0.000000E+00
B054F08-09   30  3.845210e-03  0.000000E+00
B054F08-09   31  2.136230e-03  0.000000E+00
B054F08-09   32  1.068120e-03  0.000000E+00
B054F08-09   33  4.577640e-04  0.000000E+00
B054F08-09   34  1.525880e-04  0.000000E+00
B054F08-09   35  3.051760e-05  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 4
B057F04     Input sample rate:                     5.120000e+05
B057F05     Decimation factor:                     8
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             3.417969E-05
B057F08     Correction applied (seconds):          3.417969E-05
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 4
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 5
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  5
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  6.250000e-02  0.000000E+00
B054F08-09    1  2.500000e-01  0.000000E+00
B054F08-09    2  3.750000e-01  0.000000E+00
B054F08-09    3  2.500000e-01  0.000000E+00
B054F08-09    4  6.250000e-02  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 5
B057F04     Input sample rate:                     6.400000e+04
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             3.125000E-05
B057F08     Correction applied (seconds):          3.125000E-05
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 5
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 6
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  5
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  6.250000e-02  0.000000E+00
B054F08-09    1  2.500000e-01  0.000000E+00
B054F08-09    2  3.750000e-01  0.000000E+00
B054F08-09    3  2.500000e-01  0.000000E+00
B054F08-09    4  6.250000e-02  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 6
B057F04     Input sample rate:                     3.200000e+04
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             6.250000E-05
B057F08     Correction applied (seconds):          6.250000E-05
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 6
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 7
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  6
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  3.125000e-02  0.000000E+00
B054F08-09    1  1.562500e-01  0.000000E+00
B054F08-09    2  3.125000e-01  0.000000E+00
B054F08-09    3  3.125000e-01  0.000000E+00
B054F08-09    4  1.562500e-01  0.000000E+00
B054F08-09    5  3.125000e-02  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 7
B057F04     Input sample rate:                     1.600000e+04
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             1.562500E-04
B057F08     Correction applied (seconds):          1.562500E-04
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 7
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 8
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  7
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  1.562500e-02  0.000000E+00
B054F08-09    1  9.375000e-02  0.000000E+00
B054F08-09    2  2.343750e-01  0.000000E+00
B054F08-09    3  3.125000e-01  0.000000E+00
B054F08-09    4  2.343750e-01  0.000000E+00
B054F08-09    5  9.375000e-02  0.000000E+00
B054F08-09    6  1.562500e-02  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 8
B057F04     Input sample rate:                     8.000000e+03
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             3.750000E-04
B057F08     Correction applied (seconds):          3.750000E-04
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 8
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 9
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  17
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  1.600000e-03  0.000000E+00
B054F08-09    1  6.400000e-03  0.000000E+00
B054F08-09    2  1.600000e-02  0.000000E+00
B054F08-09    3  3.200000e-02  0.000000E+00
B054F08-09    4  5.600000e-02  0.000000E+00
B054F08-09    5  8.320000e-02  0.000000E+00
B054F08-09    6  1.088000e-01  0.000000E+00
B054F08-09    7  1.280000e-01  0.000000E+00
B054F08-09    8  1.360000e-01  0.000000E+00
B054F08-09    9  1.280000e-01  0.000000E+00
B054F08-09   10  1.088000e-01  0.000000E+00
B054F08-09   11  8.320000e-02  0.000000E+00
B054F08-09   12  5.600000e-02  0.000000E+00
B054F08-09   13  3.200000e-02  0.000000E+00
B054F08-09   14  1.600000e-02  0.000000E+00
B054F08-09   15  6.400000e-03  0.000000E+00
B054F08-09   16  1.600000e-03  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 9
B057F04     Input sample rate:                     4.000000e+03
B057F05     Decimation factor:                     5
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             2.000000E-03
B057F08     Correction applied (seconds):          2.000000E-03
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 9
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 10
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  17
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  1.600000e-03  0.000000E+00
B054F08-09    1  6.400000e-03  0.000000E+00
B054F08-09    2  1.600000e-02  0.000000E+00
B054F08-09    3  3.200000e-02  0.000000E+00
B054F08-09    4  5.600000e-02  0.000000E+00
B054F08-09    5  8.320000e-02  0.000000E+00
B054F08-09    6  1.088000e-01  0.000000E+00
B054F08-09    7  1.280000e-01  0.000000E+00
B054F08-09    8  1.360000e-01  0.000000E+00
B054F08-09    9  1.280000e-01  0.000000E+00
B054F08-09   10  1.088000e-01  0.000000E+00
B054F08-09   11  8.320000e-02  0.000000E+00
B054F08-09   12  5.600000e-02  0.000000E+00
B054F08-09   13  3.200000e-02  0.000000E+00
B054F08-09   14  1.600000e-02  0.000000E+00
B054F08-09   15  6.400000e-03  0.000000E+00
B054F08-09   16  1.600000e-03  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 10
B057F04     Input sample rate:                     8.000000e+02
B057F05     Decimation factor:                     5
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             1.000000E-02
B057F08     Correction applied (seconds):          1.000000E-02
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 10
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 11
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  6
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  3.125000e-02  0.000000E+00
B054F08-09    1  1.562500e-01  0.000000E+00
B054F08-09    2  3.125000e-01  0.000000E+00
B054F08-09    3  3.125000e-01  0.000000E+00
B054F08-09    4  1.562500e-01  0.000000E+00
B054F08-09    5  3.125000e-02  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 11
B057F04     Input sample rate:                     1.600000e+02
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             1.562500E-02
B057F08     Correction applied (seconds):          1.562500E-02
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 11
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 12
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  7
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  1.562500e-02  0.000000E+00
B054F08-09    1  9.375000e-02  0.000000E+00
B054F08-09    2  2.343750e-01  0.000000E+00
B054F08-09    3  3.125000e-01  0.000000E+00
B054F08-09    4  2.343750e-01  0.000000E+00
B054F08-09    5  9.375000e-02  0.000000E+00
B054F08-09    6  1.562500e-02  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 12
B057F04     Input sample rate:                     8.000000e+01
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             3.750000E-02
B057F08     Correction applied (seconds):          3.750000E-02
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 12
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 13
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  48
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  1.428250e-05  0.000000E+00
B054F08-09    1  4.876020e-05  0.000000E+00
B054F08-09    2  9.813470e-05  0.000000E+00
B054F08-09    3  1.310000e-04  0.000000E+00
B054F08-09    4  9.342500e-06  0.000000E+00
B054F08-09    5 -3.716010e-04  0.000000E+00
B054F08-09    6 -1.018380e-03  0.000000E+00
B054F08-09    7 -1.724270e-03  0.000000E+00
B054F08-09    8 -1.789380e-03  0.000000E+00
B054F08-09    9 -4.978400e-04  0.000000E+00
B054F08-09   10  2.493910e-03  0.000000E+00
B054F08-09   11  6.626290e-03  0.000000E+00
B054F08-09   12  9.612840e-03  0.000000E+00
B054F08-09   13  8.507230e-03  0.000000E+00
B054F08-09   14  1.020350e-03  0.000000E+00
B054F08-09   15 -1.270480e-02  0.000000E+00
B054F08-09   16 -2.774930e-02  0.000000E+00
B054F08-09   17 -3.565070e-02  0.000000E+00
B054F08-09   18 -2.696020e-02  0.000000E+00
B054F08-09   19  4.848780e-03  0.000000E+00
B054F08-09   20  5.801130e-02  0.000000E+00
B054F08-09   21  1.220660e-01  0.000000E+00
B054F08-09   22  1.802650e-01  0.000000E+00
B054F08-09   23  2.147140e-01  0.000000E+00
B054F08-09   24  2.147140e-01  0.000000E+00
B054F08-09   25  1.802650e-01  0.000000E+00
B054F08-09   26  1.220660e-01  0.000000E+00
B054F08-09   27  5.801130e-02  0.000000E+00
B054F08-09   28  4.848780e-03  0.000000E+00
B054F08-09   29 -2.696020e-02  0.000000E+00
B054F08-09   30 -3.565070e-02  0.000000E+00
B054F08-09   31 -2.774930e-02  0.000000E+00
B054F08-09   32 -1.270480e-02  0.000000E+00
B054F08-09   33  1.020350e-03  0.000000E+00
B054F08-09   34  8.507230e-03  0.000000E+00
B054F08-09   35  9.612840e-03  0.000000E+00
B054F08-09   36  6.626290e-03  0.000000E+00
B054F08-09   37  2.493910e-03  0.000000E+00
B054F08-09   38 -4.978400e-04  0.000000E+00
B054F08-09   39 -1.789380e-03  0.000000E+00
B054F08-09   40 -1.724270e-03  0.000000E+00
B054F08-09   41 -1.018380e-03  0.000000E+00
B054F08-09   42 -3.716010e-04  0.000000E+00
B054F08-09   43  9.342500e-06  0.000000E+00
B054F08-09   44  1.310000e-04  0.000000E+00
B054F08-09   45  9.813470e-05  0.000000E+00
B054F08-09   46  4.876020e-05  0.000000E+00
B054F08-09   47  1.428250e-05  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 13
B057F04     Input sample rate:                     4.000000e+01
B057F05     Decimation factor:                     4
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             5.875000E-01
B057F08     Correction applied (seconds):          5.875000E-01
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 13
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+               +-------------------------------------------+                 +
#		+               |   Response (Coefficients), T0089 ch MHZ   |                 +
#		+               +-------------------------------------------+                 +
#		
B054F03     Transfer function type:                D
B054F04     Stage sequence number:                 14
B054F05     Response in units lookup:              COUNTS - Digital Counts
B054F06     Response out units lookup:             COUNTS - Digital Counts
B054F07     Number of numerators:                  128
B054F10     Number of denominators:                0
#		Numerator coefficients:
#		  i, coefficient,  error
B054F08-09    0  0.000000e+00  0.000000E+00
B054F08-09    1 -3.417520e-06  0.000000E+00
B054F08-09    2 -1.785780e-05  0.000000E+00
B054F08-09    3 -4.187670e-05  0.000000E+00
B054F08-09    4 -4.746020e-05  0.000000E+00
B054F08-09    5  1.636560e-06  0.000000E+00
B054F08-09    6  8.596750e-05  0.000000E+00
B054F08-09    7  1.102750e-04  0.000000E+00
B054F08-09    8  1.400700e-05  0.000000E+00
B054F08-09    9 -9.800100e-05  0.000000E+00
B054F08-09   10 -4.539050e-05  0.000000E+00
B054F08-09   11  1.436800e-04  0.000000E+00
B054F08-09   12  1.821390e-04  0.000000E+00
B054F08-09   13 -7.017950e-05  0.000000E+00
B054F08-09   14 -2.795630e-04  0.000000E+00
B054F08-09   15 -4.847100e-05  0.000000E+00
B054F08-09   16  3.733280e-04  0.000000E+00
B054F08-09   17  2.856760e-04  0.000000E+00
B054F08-09   18 -3.434370e-04  0.000000E+00
B054F08-09   19 -5.627360e-04  0.000000E+00
B054F08-09   20  1.699620e-04  0.000000E+00
B054F08-09   21  8.423470e-04  0.000000E+00
B054F08-09   22  2.112120e-04  0.000000E+00
B054F08-09   23 -9.944990e-04  0.000000E+00
B054F08-09   24 -7.682200e-04  0.000000E+00
B054F08-09   25  9.111790e-04  0.000000E+00
B054F08-09   26  1.434780e-03  0.000000E+00
B054F08-09   27 -4.714740e-04  0.000000E+00
B054F08-09   28 -2.049210e-03  0.000000E+00
B054F08-09   29 -3.727990e-04  0.000000E+00
B054F08-09   30  2.406420e-03  0.000000E+00
B054F08-09   31  1.589440e-03  0.000000E+00
B054F08-09   32 -2.266730e-03  0.000000E+00
B054F08-09   33 -3.015650e-03  0.000000E+00
B054F08-09   34  1.429680e-03  0.000000E+00
B054F08-09   35  4.367880e-03  0.000000E+00
B054F08-09   36  2.135230e-04  0.000000E+00
B054F08-09   37 -5.255710e-03  0.000000E+00
B054F08-09   38 -2.607520e-03  0.000000E+00
B054F08-09   39  5.247050e-03  0.000000E+00
B054F08-09   40  5.494700e-03  0.000000E+00
B054F08-09   41 -3.946660e-03  0.000000E+00
B054F08-09   42 -8.397090e-03  0.000000E+00
B054F08-09   43  1.099860e-03  0.000000E+00
B054F08-09   44  1.064780e-02  0.000000E+00
B054F08-09   45  3.314660e-03  0.000000E+00
B054F08-09   46 -1.145710e-02  0.000000E+00
B054F08-09   47 -9.007860e-03  0.000000E+00
B054F08-09   48  1.001280e-02  0.000000E+00
B054F08-09   49  1.534340e-02  0.000000E+00
B054F08-09   50 -5.583800e-03  0.000000E+00
B054F08-09   51 -2.133650e-02  0.000000E+00
B054F08-09   52 -2.404680e-03  0.000000E+00
B054F08-09   53  2.567160e-02  0.000000E+00
B054F08-09   54  1.439090e-02  0.000000E+00
B054F08-09   55 -2.666020e-02  0.000000E+00
B054F08-09   56 -3.092500e-02  0.000000E+00
B054F08-09   57  2.190050e-02  0.000000E+00
B054F08-09   58  5.361130e-02  0.000000E+00
B054F08-09   59 -6.602990e-03  0.000000E+00
B054F08-09   60 -8.925700e-02  0.000000E+00
B054F08-09   61 -3.688180e-02  0.000000E+00
B054F08-09   62  1.865350e-01  0.000000E+00
B054F08-09   63  4.037780e-01  0.000000E+00
B054F08-09   64  4.037780e-01  0.000000E+00
B054F08-09   65  1.865350e-01  0.000000E+00
B054F08-09   66 -3.688180e-02  0.000000E+00
B054F08-09   67 -8.925700e-02  0.000000E+00
B054F08-09   68 -6.602990e-03  0.000000E+00
B054F08-09   69  5.361130e-02  0.000000E+00
B054F08-09   70  2.190050e-02  0.000000E+00
B054F08-09   71 -3.092500e-02  0.000000E+00
B054F08-09   72 -2.666020e-02  0.000000E+00
B054F08-09   73  1.439090e-02  0.000000E+00
B054F08-09   74  2.567160e-02  0.000000E+00
B054F08-09   75 -2.404680e-03  0.000000E+00
B054F08-09   76 -2.133650e-02  0.000000E+00
B054F08-09   77 -5.583800e-03  0.000000E+00
B054F08-09   78  1.534340e-02  0.000000E+00
B054F08-09   79  1.001280e-02  0.000000E+00
B054F08-09   80 -9.007860e-03  0.000000E+00
B054F08-09   81 -1.145710e-02  0.000000E+00
B054F08-09   82  3.314660e-03  0.000000E+00
B054F08-09   83  1.064780e-02  0.000000E+00
B054F08-09   84  1.099860e-03  0.000000E+00
B054F08-09   85 -8.397090e-03  0.000000E+00
B054F08-09   86 -3.946660e-03  0.000000E+00
B054F08-09   87  5.494700e-03  0.000000E+00
B054F08-09   88  5.247050e-03  0.000000E+00
B054F08-09   89 -2.607520e-03  0.000000E+00
B054F08-09   90 -5.255710e-03  0.000000E+00
B054F08-09   91  2.135230e-04  0.000000E+00
B054F08-09   92  4.367880e-03  0.000000E+00
B054F08-09   93  1.429680e-03  0.000000E+00
B054F08-09   94 -3.015650e-03  0.000000E+00
B054F08-09   95 -2.266730e-03  0.000000E+00
B054F08-09   96  1.589440e-03  0.000000E+00
B054F08-09   97  2.406420e-03  0.000000E+00
B054F08-09   98 -3.727990e-04  0.000000E+00
B054F08-09   99 -2.049210e-03  0.000000E+00
B054F08-09  100 -4.714740e-04  0.000000E+00
B054F08-09  101  1.434780e-03  0.000000E+00
B054F08-09  102  9.111790e-04  0.000000E+00
B054F08-09  103 -7.682200e-04  0.000000E+00
B054F08-09  104 -9.944990e-04  0.000000E+00
B054F08-09  105  2.112120e-04  0.000000E+00
B054F08-09  106  8.423470e-04  0.000000E+00
B054F08-09  107  1.699620e-04  0.000000E+00
B054F08-09  108 -5.627360e-04  0.000000E+00
B054F08-09  109 -3.434370e-04  0.000000E+00
B054F08-09  110  2.856760e-04  0.000000E+00
B054F08-09  111  3.733280e-04  0.000000E+00
B054F08-09  112 -4.847100e-05  0.000000E+00
B054F08-09  113 -2.795630e-04  0.000000E+00
B054F08-09  114 -7.017950e-05  0.000000E+00
B054F08-09  115  1.821390e-04  0.000000E+00
B054F08-09  116  1.436800e-04  0.000000E+00
B054F08-09  117 -4.539050e-05  0.000000E+00
B054F08-09  118 -9.800100e-05  0.000000E+00
B054F08-09  119  1.400700e-05  0.000000E+00
B054F08-09  120  1.102750e-04  0.000000E+00
B054F08-09  121  8.596750e-05  0.000000E+00
B054F08-09  122  1.636560e-06  0.000000E+00
B054F08-09  123 -4.746020e-05  0.000000E+00
B054F08-09  124 -4.187670e-05  0.000000E+00
B054F08-09  125 -1.785780e-05  0.000000E+00
B054F08-09  126 -3.417520e-06  0.000000E+00
B054F08-09  127  0.000000e+00  0.000000E+00
#		
#		+                      +------------------------------+                       +
#		+                      |   Decimation, T0089 ch MHZ   |                       +
#		+                      +------------------------------+                       +
#		
B057F03     Stage sequence number:                 14
B057F04     Input sample rate:                     1.000000e+01
B057F05     Decimation factor:                     2
B057F06     Decimation offset:                     0
B057F07     Estimated delay (seconds):             6.350000E+00
B057F08     Correction applied (seconds):          6.350000E+00
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 14
B058F04     Gain:                                  1.000000e+00
B058F05     Frequency of gain:                     5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
#		+                  +---------------------------------------+                  +
#		+                  |       Channel Gain, T0089 ch MHZ      |                  +
#		+                  +---------------------------------------+                  +
#		
B058F03     Stage sequence number:                 0
B058F04     Sensitivity:                           1.222832e+06
B058F05     Frequency of sensitivity:              5.000000e-02 HZ
B058F06     Number of calibrations:                0
#		
