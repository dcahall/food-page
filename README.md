# Food-page
**Launching:**
```
sh npm i
npm webpack
npx json-server db.json
```

**Launching the bonus part:**
``` sh
cd make && make bonus && ./philo_bonus arg1 arg2 arg3 arg4 arg5
```
+ arg1 - number of philosophers
+ arg2 - lifetime of philosophers
+ arg3 - philosophers' meal time
+ arg4 - sleep time
+ arg5 - (optional argument) minimum number of meals for each philosopher
_____

**Description of the main part:**

Each philosopher is a separate **thread**. There is one fork between each pair of philosophers, so each philosopher has a fork on the left and a fork on the right. To start eating, the philosopher **needs to take 2 forks**. Protection of forks from simultaneous use by different philosophers is carried out by **mutexes**.

**Description of the bonus part:**

Each philosopher is a separate **process**. The number of forks is equal to the number of philosophers, all forks are in the center of the table. To start eating, the philosopher **needs to take 2 forks**. Forks are protected from simultaneous use by different philosophers using **semaphores**.
___

**Tests of the main part:**
``` sh 
./philo 0   210 200 100		    	# exit with error
./philo 2   210 100 -1		    	# exit with error
./philo	2   210 100 100		     	# should live
./philo 2   210 100 100 2	        # everyone should eat at least 2 times
./philo 2   199 100 100		     	# should die
./philo 2   200 101 100	      	 	# should die
./philo	3   310 100 100		     	# should live
./philo 3   299 100 100	       	 	# should die
./philo 5   800 200 200		     	# should live
./philo 5   800 200 200 7        	# everyone should eat at least 7 times
./philo 200 410 200 200		     	# should live
./philo 199 310 100 100		     	# should live
./philo 200 410 200 200	2	       	# everyone should eat at least 2 times
```
**Tests of the bonus part:**
``` sh 
./philo_bonus 0   200 200 100		# exit with error
./philo_bonus 2   200 100 -1		# exit with error
./philo_bonus 2   210 100 100		# should live
./philo_bonus 2   210 100 100 2         # everyone should eat at least 2 times
./philo_bonus 2   199 100 100		# should die
./philo_bonus 2   200 101 100		# should die
./philo_bonus 3   310 100 100		# should live
./philo_bonus 3   299 100 100		# should die
./philo_bonus 5   800 200 200		# should live
./philo_bonus 5   800 200 200 7		# everyone should eat at least 7 times
./philo_bonus 100 410 200 200		# should live
./philo_bonus 99  610 200 200		# should live
```
**Useful links:**

1. [A detailed series of videos about threads, semaphores, mutexes](https://www.youtube.com/watch?v=d9s_d28yJq0&list=PLfqABt5AS4FmuQf70psXrsMLEDQXNkLq2)
2. [A good theoretical part about threads](http://www.csc.villanova.edu/~mdamian/threads/posixthreads.html)
3. [What are the differences between process and thread?](https://www.geeksforgeeks.org/multithreading-c-2/)
4. [POSIX Threads Programming](https://hpc-tutorials.llnl.gov/posix/) 
5. [Mutex lock for Linux Thread Synchronization](https://www.thegeekstuff.com/2012/05/c-mutex-examples/)
6. [The Little Book of Semaphores](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
7. [Sem_open, sem_close and sem_unlink](https://wm-help.net/lib/b/book/1644378859/171)
