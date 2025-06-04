# ImageKit Resource Management

## Resource Limitations
We have two separate ImageKit accounts with limited resources that need to be managed carefully for 1M users:

### Profile Photos Account
- Storage Limit: 5GB total
- Bandwidth Limit: 20GB monthly transfer
- Estimated Usage: ~5KB per compressed profile photo
- Maximum Users: 1M users × 5KB = 5GB (at capacity)
- **API Keys:**
  - Public Key: `public_9v/KFB0ETFj9WxIfj2FfckvEniY=`
  - Private Key: `private_jldgFuXJEXdj5b/msEJYVe15zVk=`
  - URL Endpoint: `https://ik.imagekit.io/vlsjmvsqt/`

### Story Photos Account
- Storage Limit: 5GB total
- Bandwidth Limit: 20GB monthly transfer
- Temporary storage nature
- Auto-deletion after 24h
- **API Keys:**
  - Public Key: `public_T26XbZ4em8nFu52O4QHaQIZSAKc=`
  - Private Key: `private_/EpCsMPiCJ0YETjb6sW11lJm7tE=`
  - URL Endpoint: `https://ik.imagekit.io/yidykj9zd`

## Implementation Guidelines

### Profile Photos
1. **Size Restrictions**
   - Maximum file size: 500KB pre-compression
   - Target size after compression: 5KB - 10KB
   - Maximum dimensions: 400x400 pixels

2. **Optimization Strategies**
   - Implement client-side image compression before upload
   - Convert all images to JPEG format with 80% quality
   - Strip EXIF data before upload
   - Use WebP format for supported browsers

3. **Caching Strategy**
   - Enable browser caching for profile photos (Cache-Control: max-age=604800)
   - Implement CDN caching
   - Use local storage for active user profiles

4. **Cleanup Policies**
   - Delete profile photos of deleted accounts
   - Replace inactive user photos with placeholders after 6 months
   - Implement version control (keep only latest version)

### Story Photos
1. **Size Restrictions**
   - Maximum file size: 1MB pre-compression
   - Target size after compression: 200KB
   - Maximum dimensions: 1080x1920 pixels

2. **Optimization Strategies**
   - Aggressive compression for stories
   - Generate and serve thumbnails (100x100)
   - Implement lazy loading
   - Use progressive loading for better UX

3. **Auto-Deletion System**
   - Implement 24-hour automatic deletion
   - Schedule cleanup jobs every 6 hours
   - Monitor deletion success

4. **Bandwidth Management**
   - Implement rate limiting per user
   - Track usage patterns
   - Set daily upload limits per user

## Monitoring and Alerts

1. **Storage Monitoring**
   - Track daily storage usage
   - Alert at 80% capacity
   - Implement emergency procedures at 90% capacity

2. **Bandwidth Monitoring**
   - Track daily bandwidth consumption
   - Set up alerts at 75% of monthly limit
   - Implement throttling at 90% of limit

## Emergency Procedures

1. **Storage Emergency**
   - Temporarily disable new uploads
   - Increase compression ratios
   - Force cleanup of inactive user data

2. **Bandwidth Emergency**
   - Implement more aggressive caching
   - Reduce image quality temporarily
   - Limit story uploads

## Long-term Solutions

1. **Consider implementing a tiered system:**
   - Free users: Basic limitations
   - Premium users: Higher quality/limits

2. **Alternative Storage Solutions:**
   - Plan for migration to a more scalable solution when needed
   - Consider implementing a hybrid storage system

## Best Practices for Developers

1. Always use the provided image optimization utilities
2. Never bypass size checks
3. Implement proper error handling for quota exceeded
4. Test with bandwidth throttling
5. Monitor and report unusual usage patterns

## Environment Configuration

### Profile Photos Configuration
```env
NEXT_PUBLIC_IMAGEKIT_PROFILE_PUBLIC_KEY=public_9v/KFB0ETFj9WxIfj2FfckvEniY=
NEXT_PUBLIC_IMAGEKIT_PROFILE_PRIVATE_KEY=private_jldgFuXJEXdj5b/msEJYVe15zVk=
NEXT_PUBLIC_IMAGEKIT_PROFILE_URL_ENDPOINT=https://ik.imagekit.io/vlsjmvsqt/
```

### Story Photos Configuration
```env
NEXT_PUBLIC_IMAGEKIT_STORY_PUBLIC_KEY=public_T26XbZ4em8nFu52O4QHaQIZSAKc=
NEXT_PUBLIC_IMAGEKIT_STORY_PRIVATE_KEY=private_/EpCsMPiCJ0YETjb6sW11lJm7tE=
NEXT_PUBLIC_IMAGEKIT_STORY_URL_ENDPOINT=https://ik.imagekit.io/yidykj9zd