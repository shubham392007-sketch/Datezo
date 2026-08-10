import os
import sys
import io
import contextlib
import nbformat as nbf
import pandas as pd
import numpy as np

def run_cell_and_capture(code: str, exec_globals: dict) -> list:
    """
    Executes Python code in cell and returns nbformat output objects.
    """
    stdout_buf = io.StringIO()
    outputs = []
    
    try:
        with contextlib.redirect_stdout(stdout_buf):
            exec(code, exec_globals)
        out_str = stdout_buf.getvalue()
        if out_str:
            outputs.append(nbf.v4.new_output("stream", name="stdout", text=out_str))
    except Exception as e:
        out_str = stdout_buf.getvalue()
        if out_str:
            outputs.append(nbf.v4.new_output("stream", name="stdout", text=out_str))
        err_msg = f"{type(e).__name__}: {str(e)}"
        outputs.append(nbf.v4.new_output("stream", name="stderr", text=err_msg))
        
    return outputs

def execute_all_notebooks():
    nb_files = [
        "01_data_exploration.ipynb",
        "02_feature_engineering.ipynb",
        "03_model_training.ipynb",
        "04_model_evaluation.ipynb"
    ]
    
    for fname in nb_files:
        nb_path = os.path.join("notebooks", fname)
        if not os.path.exists(nb_path):
            continue
            
        with open(nb_path, "r", encoding="utf-8") as f:
            nb = nbf.read(f, as_version=4)
            
        exec_globals = {
            "__name__": "__main__",
            "__file__": nb_path
        }
        
        # Add project root to sys.path
        sys.path.insert(0, os.path.abspath("."))
        
        execution_count = 1
        for cell in nb.cells:
            if cell.cell_type == "code":
                cell.execution_count = execution_count
                cell.outputs = run_cell_and_capture(cell.source, exec_globals)
                execution_count += 1
                
        with open(nb_path, "w", encoding="utf-8") as f:
            nbf.write(nb, f)
            
        print(f"Successfully executed and updated outputs for: {nb_path}")

if __name__ == "__main__":
    execute_all_notebooks()
