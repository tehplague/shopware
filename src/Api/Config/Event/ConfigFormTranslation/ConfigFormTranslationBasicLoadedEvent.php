<?php declare(strict_types=1);

namespace Shopware\Api\Config\Event\ConfigFormTranslation;

use Shopware\Api\Config\Collection\ConfigFormTranslationBasicCollection;
use Shopware\Context\Struct\ShopContext;
use Shopware\Framework\Event\NestedEvent;

class ConfigFormTranslationBasicLoadedEvent extends NestedEvent
{
    public const NAME = 'config_form_translation.basic.loaded';

    /**
     * @var ShopContext
     */
    protected $context;

    /**
     * @var ConfigFormTranslationBasicCollection
     */
    protected $configFormTranslations;

    public function __construct(ConfigFormTranslationBasicCollection $configFormTranslations, ShopContext $context)
    {
        $this->context = $context;
        $this->configFormTranslations = $configFormTranslations;
    }

    public function getName(): string
    {
        return self::NAME;
    }

    public function getContext(): ShopContext
    {
        return $this->context;
    }

    public function getConfigFormTranslations(): ConfigFormTranslationBasicCollection
    {
        return $this->configFormTranslations;
    }
}