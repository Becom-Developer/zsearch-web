#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use CGI;
my $q      = CGI->new();
my $origin = $ENV{HTTP_ORIGIN};

my $cookie4 =
"sessionID5=xyzzybarbar;expires=1000;domain=.becom.co.jp;path=/;samesite=none;secure;httponly";

my @headers = (
    -type    => 'application/json',
    -charset => 'utf-8',
    -cookie  => [$cookie4],
);
if ($origin) {
    @headers = (
        @headers,
        -access_control_allow_origin      => $origin,
        -access_control_allow_headers     => 'content-type,X-Requested-With',
        -access_control_allow_methods     => 'GET,POST,OPTIONS',
        -access_control_allow_credentials => 'true',
    );
}
print $q->header(@headers);

__END__
