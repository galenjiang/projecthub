-- import Prelude

module Test
(
    main
) where

-- |double input array
doubleMe:: [a] -> [a]
doubleMe x = x ++ x

-- illustrate for if
doubleSmallNumber x =
    if x > 100
    then x
    else x * 2
-- 测试在模块里赋值，等同于定义函数
hello = doubleMe [1, 2]

-- 菲波那切数列
factorial :: Integer -> Integer
factorial n = product [1..n]

-- 测试 func constrained by type, not by type class
-- numPair :: (Num a) => a -> a -> (a, a)
-- numPair a b = (a, b)
-- a = 1 :: Int
-- b = 2 :: Float

-- 转化type or type class TODO:
-- fromIntegral' :: (Integral a, Num b) => a -> b
-- fromIntegral' a = a

-- pattern matching
lucky :: [a] -> a
lucky xs = x
-- lucky all@[x:_] = x
    where x:_ = xs

-- guard
hasBottom :: (Integral a) => a -> a
hasBottom a
    | powA > 25 = a
    | otherwise = 5
    where powA = a * a
main = do
    -- let res = doubleMe [1, 2, 3]
    -- let res = doubleSmallNumber 1000
    -- let res = [1, 2, 3, 4, 5, 6] !! 4
    -- let res = factorial 50
    -- let res = fromIntegral' (1 :: Int)
    let res = lucky "abc"
    -- let res = hasBottom 1
    print res
    print "run"
