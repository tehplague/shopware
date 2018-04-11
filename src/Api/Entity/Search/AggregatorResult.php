<?php declare(strict_types=1);

namespace Shopware\Api\Entity\Search;

use Shopware\Api\Entity\Search\Aggregation\AggregationResultCollection;
use Shopware\Context\Struct\ShopContext;
use Shopware\Framework\Struct\Struct;

class AggregatorResult extends Struct
{
    /**
     * @var AggregationResultCollection
     */
    protected $aggregations;

    /**
     * @var ShopContext
     */
    protected $context;

    /**
     * @var Criteria
     */
    protected $criteria;

    public function __construct(AggregationResultCollection $aggregations, ShopContext $context, Criteria $criteria)
    {
        $this->aggregations = $aggregations;
        $this->context = $context;
        $this->criteria = $criteria;
    }

    public function getAggregations(): AggregationResultCollection
    {
        return $this->aggregations;
    }

    public function getContext(): ShopContext
    {
        return $this->context;
    }

    public function getCriteria(): Criteria
    {
        return $this->criteria;
    }
}