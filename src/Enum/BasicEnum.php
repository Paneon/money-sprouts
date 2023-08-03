<?php

declare(strict_types=1);

namespace App\Enum;

use ReflectionClass;
use ReflectionException;

abstract class BasicEnum
{
    /**
     * @var string[]|int[]
     */
    private static array $constCacheArray = [];

    public static function getNameForValue(string $value): bool|int|string
    {
        try {
            $constants = self::getConstants();
        } catch (ReflectionException $e) {
            return false;
        }

        return array_search($value, $constants);
    }

    /**
     * @return string[]|int[]
     * @throws ReflectionException
     *
     */
    public static function getConstants(): array
    {
        $calledClass = static::class;

        if (!array_key_exists($calledClass, self::$constCacheArray)) {
            $reflect = new ReflectionClass($calledClass);
            self::$constCacheArray[$calledClass] = $reflect->getConstants();
        }

        return self::$constCacheArray[$calledClass];
    }

    public static function isValidName(string $name, bool $strict = false): bool
    {
        try {
            $constants = self::getConstants();
        } catch (ReflectionException $e) {
            return false;
        }

        if ($strict) {
            return array_key_exists($name, $constants);
        }

        $keys = array_map('strtolower', array_keys($constants));

        return in_array(strtolower($name), $keys);
    }

    public static function isValidValue(mixed $value): bool
    {
        try {
            $values = array_values(self::getConstants());

            return in_array($value, $values, $strict = true);
        } catch (ReflectionException $e) {
            return false;
        }
    }
}
