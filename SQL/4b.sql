select last_name
	, count(last_name) `count`
from actor

group by last_name

having `count` >= 2