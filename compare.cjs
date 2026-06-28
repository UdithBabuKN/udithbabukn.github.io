const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_REPO = 'udithbabukn/udithbabukn.github.io';
const LOCAL_DIR = 'dist';

function getAllLocalFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = dirPath + "/" + file;
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllLocalFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

async function fetchGithubTree() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${GITHUB_REPO}/git/trees/main?recursive=1`,
            headers: { 'User-Agent': 'AntigravityAgent' }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`Failed to fetch tree: ${res.statusCode} ${data}`));
                }
            });
        }).on('error', err => {
            reject(err);
        });
    });
}

async function compare() {
    console.log("Fetching GitHub tree...");
    const treeData = await fetchGithubTree();
    const githubFiles = {};
    
    treeData.tree.forEach(item => {
        if (item.type === 'blob') {
            githubFiles[item.path] = item.size;
        }
    });

    console.log("Scanning local dist folder...");
    const localFilePaths = getAllLocalFiles(LOCAL_DIR);
    const localFiles = {};
    
    localFilePaths.forEach(fp => {
        const relativePath = fp.replace(LOCAL_DIR + '/', '');
        const size = fs.statSync(fp).size;
        localFiles[relativePath] = size;
    });

    const missingOnGithub = [];
    const missingLocally = [];
    const sizeMismatch = [];

    // Check local against github
    for (const [filepath, size] of Object.entries(localFiles)) {
        if (!(filepath in githubFiles)) {
            missingOnGithub.push(filepath);
        } else if (githubFiles[filepath] !== size) {
            sizeMismatch.push({ path: filepath, localSize: size, githubSize: githubFiles[filepath] });
        }
    }

    // Check github against local
    for (const filepath of Object.keys(githubFiles)) {
        if (!(filepath in localFiles)) {
            missingLocally.push(filepath);
        }
    }

    console.log("\n=== COMPARISON RESULTS ===");
    
    if (missingOnGithub.length > 0) {
        console.log("\nFiles MISSING ON GITHUB (You forgot to upload these):");
        missingOnGithub.forEach(f => console.log(` - ${f}`));
    } else {
        console.log("\nNo local files are missing on GitHub!");
    }

    if (missingLocally.length > 0) {
        console.log("\nFiles ONLY ON GITHUB (Old files you should delete from GitHub):");
        missingLocally.forEach(f => console.log(` - ${f}`));
    } else {
        console.log("\nNo extra old files on GitHub!");
    }

    if (sizeMismatch.length > 0) {
        console.log("\nFiles that DO NOT MATCH (You uploaded an older/different version):");
        sizeMismatch.forEach(f => console.log(` - ${f.path} (Local: ${f.localSize} bytes, GitHub: ${f.githubSize} bytes)`));
    } else {
        console.log("\nAll file sizes perfectly match between Local and GitHub!");
    }
}

compare().catch(console.error);
