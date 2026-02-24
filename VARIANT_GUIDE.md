# Dynamic Mobile Variants Guide

## Overview
Your e-commerce store now supports dynamic product variants with color swatches and storage options that automatically update price, images, and specifications when selected.

## How to Add Products with Variants

### Supported Colors

The system automatically displays color swatches based on what you add. Supported colors include:

**Basic Colors:**
- black, white, gray/grey

**Metallic Colors:**
- silver, gold, rose gold/rosegold
- space gray/spacegray, graphite, titanium
- bronze, copper, champagne

**Apple-Style Colors:**
- midnight, starlight

**Standard Colors:**
- red, blue, green, yellow, orange, purple, pink

**Extended Colors:**
- navy/navy blue, sky blue, light blue, dark blue
- coral, mint/mint green, lavender, violet
- burgundy, maroon, brown, beige, cream

💡 **Tip:** Colors are dynamically extracted from your variants. Only colors you add will be shown to customers.

### From Admin Panel

1. **Navigate to Admin > Products > Add Product**

2. **Fill Basic Information:**
   - Product Name: e.g., "iPhone 15 Pro"
   - Category: Select "mobiles"
   - Brand: Select brand
   - Main Image, Hover Image, Gallery Images

3. **Add Variants (Section in Admin):**

   Click "Add Variant" and fill in:
   
   **Variant 1 - Orange 256GB:**
   - SKU: `iphone-15-orange-256`
   - Name: `Orange 256GB`
   - Price: `134900`
   - MRP: `149900`
   - Stock: `15`
   - Color: `orange`
   - Storage: `256 GB`
   - RAM: `8 GB`
   - Images: (optional - specific variant images)

   **Variant 2 - Silver 256GB:**
   - SKU: `iphone-15-silver-256`
   - Name: `Silver 256GB`
   - Price: `134900`
   - MRP: `149900`
   - Stock: `20`
   - Color: `silver`
   - Storage: `256 GB`
   - RAM: `8 GB`

   **Variant 3 - Black 256GB:**
   - SKU: `iphone-15-black-256`
   - Name: `Black 256GB`
   - Price: `134900`
   - MRP: `149900`
   - Stock: `10`
   - Color: `black`
   - Storage: `256 GB`
   - RAM: `8 GB`

   **Variant 4 - Black 512GB:**
   - SKU: `iphone-15-black-512`
   - Name: `Black 512GB`
   - Price: `154900`
   - MRP: `169900`
   - Stock: `8`
   - Color: `black`
   - Storage: `512 GB`
   - RAM: `8 GB`

   **Variant 5 - Black 1TB:**
   - SKU: `iphone-15-black-1tb`
   - Name: `Black 1TB`
   - Price: `184900`
   - MRP: `199900`
   - Stock: `5`
   - Color: `black`
   - Storage: `1 TB`
   - RAM: `8 GB`

4. **Save Product**

## What Customers See

### Color Selection:
- **Circular color swatches** with actual color representation
- Border highlight on selected color
- Price shown below each color if it differs
- Example: Orange, Silver, Black displayed as colored circles

### Storage Selection:
- **Rectangular buttons** for storage options (1 TB, 256 GB, 512 GB)
- Active state with blue border and background
- Hover effects for better UX

### Dynamic Updates:
When a variant is selected, the page automatically updates:
- ✅ Product price
- ✅ MRP (crossed out price)
- ✅ Discount percentage
- ✅ Product images (if variant has specific images)
- ✅ Stock availability
- ✅ Specifications (Storage, RAM shown in a box)

### Example UI Layout:
```
Colour: Orange
[🟠 Orange]  [⚪ Silver]  [⚫ Black]
₹1,34,900    ₹1,34,900   ₹1,34,900

Size: 256 GB
[1 TB]  [256 GB]  [512 GB]
        (selected)

┌─────────────────────────────────┐
│ Brand            Apple          │
│ Memory Storage   256 GB         │
│ RAM Installed    8 GB           │
└─────────────────────────────────┘
```

## Supported Colors

The system recognizes these color names and converts them to hex:
- black → #000000
- white → #FFFFFF
- silver → #C0C0C0
- gold → #FFD700
- blue → #0000FF
- red → #FF0000
- green → #00FF00
- pink → #FFC0CB
- purple → #800080
- orange → #FF8C42
- gray/grey → #808080

## API Structure

Variants are stored in MongoDB under each product:

```json
{
  "title": "iPhone 15 Pro",
  "category": "mobiles",
  "variants": [
    {
      "sku": "iphone-15-orange-256",
      "name": "Orange 256GB",
      "price": 134900,
      "mrp": 149900,
      "discount": 10,
      "stock": 15,
      "attributes": {
        "color": "orange",
        "storage": "256 GB",
        "ram": "8 GB"
      },
      "images": ["url1", "url2"],
      "status": "active"
    }
  ]
}
```

## Features

✅ Dynamic color swatches with visual representation
✅ Storage/size button selection
✅ Real-time price updates
✅ Automatic discount calculation
✅ Stock availability per variant
✅ Variant-specific images
✅ Mobile-responsive design
✅ Smooth animations on selection
✅ Specification updates based on variant

## Testing

To test the feature:

1. Add a product with multiple variants from admin panel
2. View the product on the frontend
3. Click on different colors - watch price and images update
4. Click on different storage options - see specs update
5. Add to cart with variant info shown in toast notification

## Notes

- The first color and first storage option are selected by default
- If a variant is out of stock, it still shows but availability changes to "Out of Stock"
- Variant images override main product images when selected
- Cart will show variant details in the add notification
- Mobile view maintains all functionality with touch-friendly sizes
