-- |double input array
doubleMe:: [a] -> [a]
doubleMe x = x ++ x

-- |illustrate for if



main = do
    let res = doubleMe [1, 2, 3]
    print res

