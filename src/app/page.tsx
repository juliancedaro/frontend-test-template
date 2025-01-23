'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/components/GameCard';
import { Game } from '@/lib/types';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `/api/games?genre=${genre || ''}&page=${page}`
      );
      const data = await response.json();
      setGames(prev => (page === 1 ? data.games : [...prev, ...data.games]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setGames([]);
    setLoading(true);
    fetchGames();
  }, [genre]);

  useEffect(() => {
    if (page > 1) {
      fetchGames();
    }
  }, [page]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Top Sellers</h1>
        <select
          className="rounded-md border p-2"
          value={genre || ''}
          onChange={(e) => {
            const url = new URL(window.location.href);
            if (e.target.value) {
              url.searchParams.set('genre', e.target.value);
            } else {
              url.searchParams.delete('genre');
            }
            window.history.pushState({}, '', url);
            setPage(1);
            setGames([]);
            setLoading(true);
            fetchGames();
          }}
        >
          <option value="">All Genres</option>
          <option value="Action RPG">Action RPG</option>
          <option value="Metroidvania">Metroidvania</option>
          <option value="Battle Royale">Battle Royale</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="rounded bg-gray-800 px-6 py-2 text-white hover:bg-gray-700"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}