export function zip(...arrays) {
    const minLength = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
}

export function seperateLineForPath(array) {
    try {
        let ans = [];
        const n = array.length;

        const generatePath = (array, row, col, path) => {
            if (row == n) {
                ans.push(path);
                return;
            }
            const m = array[row].length;

            generatePath(array, row + 1, 0, [...path, array[row][col]]);
            if (col <= m - 2) {
                generatePath(array, row, col + 1, path);
            }
        }

        generatePath(array, 0, 0, []);
        let miniSize = 10000;

        ans.map((nums) => {
            let count = 0;
            for (let i = 1; i < n; i++) {
                if (nums[i] != nums[i - 1]) {
                    count++;
                }
            }
            miniSize = Math.min(miniSize, count);
        })

        ans = ans.filter((nums) => {
            let count = 0;
            for (let i = 1; i < n; i++) {
                if (nums[i] != nums[i - 1]) {
                    count++;
                }
            }
            return miniSize == count;
        })

        ans = zip(...ans);
        ans = ans.map((nums) => {
            let set = new Set(nums);
            let temp = [];
            set.forEach((value) => {
                temp.push(value);
            })
            return temp.sort();
        });
        return ans;
    } catch (err) {
        console.log(err);
    }
}

export function constructLineColorAnswer(resultStationArray, allStations) {
    const n = resultStationArray.length;
    if (n === 0) return [];
    
    let array = Array.from({ length: n }, (_, index) => {
        return allStations.at(resultStationArray[index]).line_color_code;
    });

    const line_color = ['black', 'green', 'blue', 'pink', 'orange', 'purple'];
    array = array.map(nums => nums.map(color => line_color.indexOf(color.toLowerCase())));
    return seperateLineForPath(array);

}


export const sortTrainList = (res)=>{
    const {data} = res;
    return res.data = data.sort((a,b)=>{
        return a.train_base.from_time - b.train_base.from_time
    });
    
}