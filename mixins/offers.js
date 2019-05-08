import util from '~/mixins/util.js'

export default {
    mixins: [util],
    data() {
        return {
            selectedValues: {},
        }
    },
    methods: {
        setCurrent() {
            var i,
              j = 0,
              arCanBuyValues = [],
              strName = '',
              arShowValues = false,
              arFilter = {},
              tmpFilter = [],
              treeProps = this.object_in_array(this.item.SKU_PROPS),
              current = this.item.JS_OFFERS[this.item.OFFERS_SELECTED].TREE;
            
    
            for(i = 0; i<treeProps.length; i++) {
                strName = 'PROP_'+treeProps[i].ID;
                arShowValues = this.getRowValues(arFilter, strName);
    
                if (!arShowValues)
                    break;
                
                if (this.in_array(current[strName], arShowValues))
                {
                    arFilter[strName] = current[strName];
                }
                else
                {
                    arFilter[strName] = arShowValues[0];
                    this.item.CURRENT = this.item.JS_OFFERS[0];
                }
                this.updateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
            }
    
            this.selectedValues = arFilter;
            this.setOfferIndex();
        },
        setOfferIndex() {
            var i, j,
                index = -1,
                boolOneSearch = true;

            for (i = 0; i < this.item.JS_OFFERS.length; i++)
            {
                boolOneSearch = true;
                for (j in this.selectedValues)
                {
                    if (this.selectedValues[j] !== this.item.JS_OFFERS[i].TREE[j])
                    {
                        boolOneSearch = false;
                        break;
                    }
                }
                if (boolOneSearch)
                {
                    index = i;
                    break;
                }
            }

            if (index > -1)
                this.item.CURRENT = this.item.JS_OFFERS[index];

            
        },
        selectOfferProp(prop_id, value_id, $event) {
            var i = 0,
                value = '',
                rowItems = null;
    
            if(this.hasClass($event.target, 'selected'))
                return;
    
            if(this.searchOfferPropIndex(prop_id,value_id)) {
                rowItems = $event.target.parentNode.querySelectorAll('li');
                if (rowItems && 0 < rowItems.length)
                {
                    for (i = 0; i < rowItems.length; i++)
                    {
                        value = Number(rowItems[i].getAttribute('data-value'));
                        if (value === value_id)
                        {
                            rowItems[i].classList.add("selected");
                        }
                        else
                        {
                            rowItems[i].classList.remove("selected");
                        }
                    }
                }
            }
        },
        searchOfferPropIndex(strPropID, strPropValue) {
            var strName = '',
              arShowValues = false,
              i, j,
              arCanBuyValues = [],
              allValues = [],
              index = -1,
              arFilter = {},
              treeProps = this.object_in_array(this.item.SKU_PROPS),
              tmpFilter = [];
    
            for (i = 0; i < treeProps.length; i++)
            {
                if (treeProps[i].ID === strPropID)
                {
                    index = i;
                    break;
                }
            }
    
            if (-1 < index)
            {
                for (i = 0; i < index; i++)
                {
                    strName = 'PROP_'+treeProps[i].ID;
                    arFilter[strName] = this.selectedValues[strName];
                }
                strName = 'PROP_'+treeProps[index].ID;
                arShowValues = this.getRowValues(arFilter, strName);
                if (!arShowValues)
                {
                    return false;
                }
                if (!this.in_array(strPropValue, arShowValues))
                {
                    return false;
                }
                arFilter[strName] = strPropValue;
              
                for (i = index+1; i < treeProps.length; i++)
                {
                    strName = 'PROP_'+treeProps[i].ID;
                    arShowValues = this.getRowValues(arFilter, strName);
                    if (!arShowValues)
                    {
                        return false;
                    }
        
                    arCanBuyValues = arShowValues;
        
                    if (this.selectedValues[strName] && this.in_array(this.selectedValues[strName], arCanBuyValues))
                    {
                        arFilter[strName] = this.selectedValues[strName];
                    }
                    else 
                    {
                        arFilter[strName] = arCanBuyValues[0];
                    }
                    
                    this.updateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
                }
                this.selectedValues = arFilter;
				this.setOfferIndex();
            }
            return true;
        },
        getRowValues(arFilter, index) {
            var i = 0,
                j,
                arValues = [],
                boolSearch = false,
                boolOneSearch = true;
    
            if (0 === arFilter.length)
            {
                for (i = 0; i < this.item.JS_OFFERS.length; i++)
                {
                    if(!this.in_array(this.item.JS_OFFERS[i].TREE[index], arValues)) {
                    arValues[arValues.length] = this.item.JS_OFFERS[i].TREE[index];
                    }
                }
                boolSearch = true;
            }
            else
            {
                for (i = 0; i < this.item.JS_OFFERS.length; i++)
                {
                    boolOneSearch = true;
                    for (j in arFilter)
                    {
                        if (arFilter[j] !== this.item.JS_OFFERS[i].TREE[j])
                        {
                            boolOneSearch = false;
                            break;
                        }
                    }
                    if (boolOneSearch)
                    {
                        if(!this.in_array(this.item.JS_OFFERS[i].TREE[index], arValues)) {
                            arValues[arValues.length] = this.item.JS_OFFERS[i].TREE[index];
                        }
                        boolSearch = true;
                    }
                }
            }
            return (boolSearch ? arValues : false);
        },
        updateRow(intNumber, activeID, showID, canBuyID) {
            var i = 0,
                value = '',
                isCurrent = false,
                rowItems = null;
    
            var lineContainer = this.$refs.sku_line_block;
            
            if (intNumber > -1 && intNumber < lineContainer.length)
            {
                rowItems = lineContainer[intNumber].querySelectorAll('li');
                if (rowItems && 0 < rowItems.length)
                {
                    for (i = 0; i < rowItems.length; i++)
                    {
                        value = Number(rowItems[i].getAttribute('data-value'));
                        isCurrent = value === activeID;
                        if (isCurrent)
                        {
                            rowItems[i].classList.add("selected");
                        }
                        else
                        {
                            rowItems[i].classList.remove("selected");
                        }
                        
                        rowItems[i].style.display = this.in_array(value, showID) ? '' : 'none';
                    }
                }
            }
        }
    },
    mounted() {
        if (this.item.PRODUCT.TYPE == 3)
            this.setCurrent();
    }
}