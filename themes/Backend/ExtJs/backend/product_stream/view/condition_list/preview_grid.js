/**
 * Shopware 5
 * Copyright (c) shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 *
 * @category   Shopware
 * @package    ProductStream
 * @subpackage Window
 * @version    $Id$
 * @author shopware AG
 */
//{namespace name=backend/product_stream/main}

Ext.define('Shopware.apps.ProductStream.view.condition_list.PreviewGrid', {
    extend: 'Ext.grid.Panel',
    title: '{s name=preview}Preview{/s}',
    alias: 'widget.product-stream-preview-grid',

    initComponent: function() {
        var me = this;

        me.store = Ext.create('Shopware.apps.ProductStream.store.Preview');

        me.pagingbar = Ext.create('Ext.toolbar.Paging', {
            store: me.store,
            dock: 'bottom',
            displayInfo: true
        });
        me.toolbar = me.createToolbar();

        me.columns = me.createColumns();
        me.dockedItems = [me.toolbar, me.pagingbar];
        me.callParent(arguments);
    },

    createToolbar: function() {
        var me = this;

        me.customerGroupStore = Ext.create('Shopware.store.Search', {
            configure: function() {
                return { entity: 'Shopware\\Models\\Customer\\Group' }
            },
            fields: ['key', 'name']
        }).load();

        me.currencyStore = Ext.create('Shopware.store.Search', {
            configure: function() {
                return { entity: 'Shopware\\Models\\Shop\\Currency' }
            },
            fields: ['id', 'currency']
        }).load();

        me.currencyCombo = Ext.create('Ext.form.field.ComboBox', {
            displayField: 'currency',
            valueField: 'id',
            store: me.currencyStore,
            value: 1,
            fieldLabel: '{s name=currency}Currency{/s}',
            forceSelection: true,
            name: 'currency',
            labelWidth: 100
        });
        me.customerCombo = Ext.create('Ext.form.field.ComboBox', {
            displayField: 'name',
            valueField: 'key',
            store: me.customerGroupStore,
            value: 'EK',
            name: 'customerGroup',
            fieldLabel: '{s name=customer_group}Customer group{/s}',
            forceSelection: true,
            labelWidth: 100
        });
        me.shopCombo = Ext.create('Ext.form.field.ComboBox', {
            store: Ext.create('Shopware.apps.Base.store.ShopLanguage').load(),
            displayField: 'name',
            valueField: 'id',
            name: 'shop',
            forceSelection: true,
            value: 1,
            fieldLabel: '{s name=shop}Shop{/s}',
            labelWidth: 100
        });

        return Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            items: [me.shopCombo, me.currencyCombo, me.customerCombo]
        });
    },

    createColumns: function() {
        return [{
            header: '{s name=number}Number{/s}',
            width: 110,
            dataIndex: 'number'
        },{
            header: '{s name=name}Name{/s}',
            flex: 1,
            dataIndex: 'name'
        }, {
            header: '{s name=stock}Stock{/s}',
            width: 60,
            dataIndex: 'stock'
        }, {
            header: '{s name=price}Price{/s}',
            dataIndex: 'cheapestPrice',
            renderer: this.priceRenderer
        }];
    },

    priceRenderer: function(value) {
        var me = this;

        if (!Ext.isObject(value)) {
            return '';
        }

        if (!value.hasOwnProperty('calculatedPrice')) {
            return '';
        }

        return value.calculatedPrice;
    }
});
