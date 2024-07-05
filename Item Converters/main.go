package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"
)

type Item struct {
	Id        string `json:"Id"`
	ItemID    string `json:"itemId"`
	ItemsName string `json:"itemsName"`
}

type Result struct {
	Items []Item `json:"items"`
}

func processFile(inputFile, outputFile string) error {
	file, err := os.Open(inputFile)
	if err != nil {
		return err
	}
	defer file.Close()

	var itemsList []Item
	scanner := bufio.NewScanner(file)
	lineRegex := regexp.MustCompile(`\s*(\d+):\s+(\S+)\s+:\s+(.+)`)
	suffixRegex := regexp.MustCompile(`@(\d+)$`)

	for scanner.Scan() {
		line := scanner.Text()
		matches := lineRegex.FindStringSubmatch(line)
		if matches != nil {
			itemID := matches[1]
			itemCode := matches[2]
			itemName := strings.ToLower(strings.TrimSpace(matches[3]))

			suffixMatches := suffixRegex.FindStringSubmatch(itemCode)
			if suffixMatches != nil {
				itemName += "@" + suffixMatches[1]
			}

			item := Item{
				Id:        itemID,
				ItemID:    itemCode,
				ItemsName: itemName,
			}
			itemsList = append(itemsList, item)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	result := Result{Items: itemsList}

	return writeJSONToFile(result, outputFile)
}

func writeJSONToFile(data interface{}, filename string) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	return encoder.Encode(data)
}

func main() {
	inputFilePath := "item.txt"
	outputFilePath := "output.json"

	err := processFile(inputFilePath, outputFilePath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Processing completed. Check 'output.json'.")
}
