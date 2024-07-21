<?php

namespace Olooeez\AcademicEventManager\Config;

class JwtConfig
{
    private static $secret_key = "";
    private static $algortithm = "HS256";

    public static function getSecretKey()
    {
        return self::$secret_key;
    }

    public static function getAlgortithm()
    {
        return self::$algortithm;
    }
}
