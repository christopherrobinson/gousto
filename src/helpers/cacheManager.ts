/**
 * Advanced caching system with WeakMap support and memory management
 */

// Types for cache entries
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  hits: number;
}

interface CacheOptions {
  maxAge?: number; // in milliseconds
  maxSize?: number; // maximum number of entries
  enableStats?: boolean;
}

/**
 * Advanced cache implementation with LRU eviction and statistics
 */
class AdvancedCache<K, V> {
  private cache = new Map<K, CacheEntry<V>>();
  private accessOrder = new Map<K, number>(); // For LRU tracking
  private accessCounter = 0;
  private readonly maxAge: number;
  private readonly maxSize: number;
  private readonly enableStats: boolean;

  constructor(options: CacheOptions = {}) {
    this.maxAge = options.maxAge ?? 6 * 60 * 60 * 1000; // 6 hours (hours * minutes * seconds * milliseconds)
    this.maxSize = options.maxSize ?? 100; // 100 entries
    this.enableStats = options.enableStats ?? false;
  }

  set(key: K, value: V): void {
    const now = Date.now();

    // Remove oldest entries if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data: value,
      timestamp: now,
      hits: 0
    });

    this.accessOrder.set(key, ++this.accessCounter);
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.delete(key);
      return undefined;
    }

    // Update access tracking
    if (this.enableStats) {
      entry.hits++;
    }
    this.accessOrder.set(key, ++this.accessCounter);

    return entry.data;
  }

  has(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.delete(key);
      return false;
    }

    return true;
  }

  delete(key: K): boolean {
    this.accessOrder.delete(key);
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder.clear();
    this.accessCounter = 0;
  }

  private evictOldest(): void {
    // Find the least recently used entry
    let oldestKey: K | undefined;
    let oldestAccess = Infinity;

    for (const [key, accessTime] of this.accessOrder) {
      if (accessTime < oldestAccess) {
        oldestAccess = accessTime;
        oldestKey = key;
      }
    }

    if (oldestKey !== undefined) {
      this.delete(oldestKey);
    }
  }

  getStats() {
    if (!this.enableStats) {
      return { message: 'Stats not enabled' };
    }

    const entries = Array.from(this.cache.values());
    const totalHits = entries.reduce((sum, entry) => sum + entry.hits, 0);
    const avgHits = entries.length > 0 ? totalHits / entries.length : 0;

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      totalHits,
      avgHits: Math.round(avgHits * 100) / 100,
      oldestEntry: Math.min(...entries.map(e => e.timestamp)),
      newestEntry: Math.max(...entries.map(e => e.timestamp))
    };
  }
}

/**
 * WeakMap-based cache for object keys (automatic garbage collection)
 */
class WeakCache<K extends object, V> {
  private cache = new WeakMap<K, CacheEntry<V>>();
  private readonly maxAge: number;

  constructor(maxAge: number = 30 * 60 * 1000) {
    this.maxAge = maxAge;
  }

  set(key: K, value: V): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      hits: 0
    });
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return undefined;
    }

    entry.hits++;
    return entry.data;
  }

  has(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }
}

// Global cache instances
export const recipeCache = new AdvancedCache<string, any[]>();

export const categoryCache = new AdvancedCache<string, any[]>();

export const cuisineCache = new AdvancedCache<string, any[]>();

export const ingredientCache = new AdvancedCache<string, any[]>();

// WeakMap cache for object-based caching (automatic garbage collection)
export const objectCache = new WeakCache<object, any>(30 * 60 * 1000); // 30 minutes

// Utility functions
export const createCacheKey = (...parts: (string | number | boolean | undefined | null)[]): string => {
  return parts
    .filter(part => part !== undefined && part !== null)
    .map(part => String(part))
    .join('|');
};

export const getCacheStats = () => ({
  recipe: recipeCache.getStats(),
  category: categoryCache.getStats(),
  cuisine: cuisineCache.getStats(),
  ingredient: ingredientCache.getStats()
});

// Cache invalidation utilities
export const invalidateAllCaches = () => {
  recipeCache.clear();
  categoryCache.clear();
  cuisineCache.clear();
  ingredientCache.clear();
};

export const invalidateRecipeRelatedCaches = () => {
  recipeCache.clear();
  categoryCache.clear();
  cuisineCache.clear();
  ingredientCache.clear();
};
