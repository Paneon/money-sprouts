<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Avatar;
use App\Repository\AvatarRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Avatar>
 *
 * @method        Avatar|Proxy                     create(array|callable $attributes = [])
 * @method static Avatar|Proxy                     createOne(array $attributes = [])
 * @method static Avatar|Proxy                     find(object|array|mixed $criteria)
 * @method static Avatar|Proxy                     findOrCreate(array $attributes)
 * @method static Avatar|Proxy                     first(string $sortedField = 'id')
 * @method static Avatar|Proxy                     last(string $sortedField = 'id')
 * @method static Avatar|Proxy                     random(array $attributes = [])
 * @method static Avatar|Proxy                     randomOrCreate(array $attributes = [])
 * @method static AvatarRepository|RepositoryProxy repository()
 * @method static Avatar[]|Proxy[]                 all()
 * @method static Avatar[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Avatar[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Avatar[]|Proxy[]                 findBy(array $attributes)
 * @method static Avatar[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Avatar[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class AvatarFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'url' => self::faker()->imageUrl(100, 100),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this// ->afterInstantiate(function(Avatar $avatar): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Avatar::class;
    }
}
